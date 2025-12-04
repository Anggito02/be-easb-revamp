import { Injectable } from '@nestjs/common';
import { KertasKerjaDto } from 'src/presentation/asb_document/dto/kertas_kerja.dto'
import * as puppeteer from 'puppeteer';

@Injectable()
export class KertasKerjaUseCase {
    async execute(data: KertasKerjaDto): Promise<Buffer> {
        const html = await this.generateHtml(data);
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set content and wait for network idle to ensure styles are loaded
        await page.setContent(html, { waitUntil: 'networkidle0' });

        // Generate PDF
        // Format A4, print background to keep colors
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '15mm',
                bottom: '15mm',
                left: '15mm',
                right: '15mm'
            }
        });

        await browser.close();
        return Buffer.from(pdfBuffer);
    }

    async generateHtml(data: KertasKerjaDto): Promise<string> {
        const { title, tipe_bangunan, tanggal_cetak, dataAsb, dataAsbDetailReview, shst, dataBps, dataBpns } = data;

        // Helper for number formatting
        const number_format = (num: number, decimals = 0) => {
            return num?.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) || '0';
        };

        // Helper for terbilang (simplified version)
        const terbilang = (nilai: number): string => {
            const angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
            let temp = "";
            if (nilai < 12) {
                temp = " " + angka[nilai];
            } else if (nilai < 20) {
                temp = terbilang(nilai - 10) + " Belas";
            } else if (nilai < 100) {
                temp = terbilang(Math.floor(nilai / 10)) + " Puluh" + terbilang(nilai % 10);
            } else if (nilai < 200) {
                temp = " Seratus" + terbilang(nilai - 100);
            } else if (nilai < 1000) {
                temp = terbilang(Math.floor(nilai / 100)) + " Ratus" + terbilang(nilai % 100);
            } else if (nilai < 2000) {
                temp = " Seribu" + terbilang(nilai - 1000);
            } else if (nilai < 1000000) {
                temp = terbilang(Math.floor(nilai / 1000)) + " Ribu" + terbilang(nilai % 1000);
            } else if (nilai < 1000000000) {
                temp = terbilang(Math.floor(nilai / 1000000)) + " Juta" + terbilang(nilai % 1000000);
            } else if (nilai < 1000000000000) {
                temp = terbilang(Math.floor(nilai / 1000000000)) + " Milyar" + terbilang(nilai % 1000000000);
            }
            return temp;
        };

        // Calculate totals for BPS
        let sumBps = 0;
        let jbobotKoef = 0;
        const bpsRows = dataBps.map((row, i) => {
            const bobot = row.asb.bobot_input ?? 0;
            const jumlahBobot = row.asb.jumlah_bobot ?? 0;
            const rincianHarga = row.asb.rincian_harga ?? 0;

            if (row.asb.jumlah_bobot) jbobotKoef += row.asb.jumlah_bobot;
            if (row.asb.rincian_harga) sumBps += row.asb.rincian_harga;

            return `
                <tr>
                    <td class="text-center">${i + 1}</td>
                    <td>${row.komponen}</td>
                    <td class="text-right">
                        ${bobot} %
                    </td>
                    <td class="text-right">
                        ${row.asb.rincian_harga ? number_format(rincianHarga) : '-'}
                    </td>
                </tr>
            `;
        }).join('');

        // Calculate totals for BPNS
        let sumBpns = 0;
        let jbobotNsKoef = 0;
        const bpnsRows = dataBpns.map((row, i) => {
            const bobot = row.asb.bobot_input ?? 0;
            const jumlahBobot = row.asb.jumlah_bobot ?? 0;
            const rincianHarga = row.asb.rincian_harga ?? 0;

            if (row.asb.jumlah_bobot) jbobotNsKoef += row.asb.jumlah_bobot;
            if (row.asb.rincian_harga) sumBpns += row.asb.rincian_harga;

            return `
                <tr>
                    <td class="text-center">${i + 1}</td>
                    <td>${row.komponen}</td>
                    <td class="text-right">
                        ${bobot} %
                    </td>
                    <td class="text-right">
                        ${row.asb.rincian_harga ? number_format(rincianHarga) : '-'}
                    </td>
                </tr>
            `;
        }).join('');

        const totalBiayaKonstruksi = sumBps + sumBpns;

        // Jakon calculations (using values from dataAsb if available, otherwise 0)
        const jakonPerencanaan = dataAsb.perencanaanKonstruksi ?? 0;
        const jakonPengawasan = dataAsb.pengawasanKonstruksi ?? 0;
        const jakonManagement = dataAsb.managementKonstruksi ?? 0;
        const jakonPengelolaan = dataAsb.pengelolaanKegiatan ?? 0;

        const totalFinal = totalBiayaKonstruksi + jakonPerencanaan + jakonPengawasan + jakonManagement + jakonPengelolaan;
        const totalFinalRounded = Math.round(totalFinal); // Assuming bulatbulat does rounding

        // Helper to safely access nested properties
        const getOpd = (d: any) => d.opd?.opd ?? '';
        const getNama = (d: any) => d.namaAsb ?? ''; // Changed from nama to namaAsb based on entity
        const getTahun = (d: any) => d.tahunAnggaran ?? '';
        const getTotalLantai = (d: any) => d.totalLantai ?? '';
        const getTipeBangunan = (d: any) => d.asbTipeBangunan?.tipeBangunan ?? tipe_bangunan; // Fallback to input
        const getKlasifikasi = (d: any) => d.asbKlasifikasi?.klasifikasi ?? ''; // Check entity relation name
        const getKabKota = (d: any) => d.kabkota?.kabkota ?? '';
        console.log("dataAsbDetailsReview", dataAsbDetailReview)

        const asbDetailsReview = dataAsbDetailReview.map((detail, i: number) => `
            <tr>
                <td></td>
                <td>- Luas ${detail.asb_lantai?.lantai}</td>
                <td>:</td>
                <td>${detail.luas} m<sup>2</sup></td>
            </tr>
        `).join('');

        const detailFungsiRows = dataAsbDetailReview.map((detail: any, i: number) => `
            <tr>
                <td></td>
                <td>- Fungsi Lantai ${i + 1}</td>
                <td>:</td>
                <td>${detail.fungsiBangunan?.nama ?? ''} </td>
            </tr>
        `).join('');

        const totalLuas = dataAsbDetailReview.reduce((acc: number, curr: any) => acc + (curr.luas || 0), 0);

        return `
<!DOCTYPE html>
<html>
<head>
    <title>Kertas Kerja - ${getNama(dataAsb)}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style type="text/css">
        @page {
            margin: 15mm 12mm 20mm 12mm;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f5f7fb;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            color: #333;
        }

        .report-wrapper {
            padding: 20px 24px 70px 24px;
            background-color: #ffffff;
        }

        .report-header {
            margin-bottom: 15px;
        }

        .report-title {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .report-title u {
            text-decoration-thickness: 1px;
        }

        .report-meta {
            font-size: 10px;
            margin-top: 6px;
            color: #666;
        }

        .table-condensed > thead > tr > th,
        .table-condensed > tbody > tr > th,
        .table-condensed > tfoot > tr > th,
        .table-condensed > thead > tr > td,
        .table-condensed > tbody > tr > td,
        .table-condensed > tfoot > tr > td {
            padding: 3px 6px;
        }

        .table {
            border-collapse: collapse !important;
            margin-bottom: 12px;
        }

        .table th,
        .table td {
            border: 1px solid #dee2e6;
            vertical-align: middle;
        }

        .table-striped tbody tr:nth-of-type(odd) {
            background-color: #f9fbff;
        }

        .table-striped tbody tr:nth-of-type(even) {
            background-color: #ffffff;
        }

        .table-hover tbody tr:hover {
            background-color: #eef2ff;
        }

        .table > thead > tr > th {
            color: #ffffff;
            background: linear-gradient(90deg, #192841, #243b64);
            border-color: #192841;
            font-weight: 600;
        }

        .table.section-table > thead > tr > th:first-child {
            width: 3%;
            text-align: center;
        }

        .table.section-table > thead > tr > th:nth-child(2) {
            text-align: left;
        }

        .table.det > thead > tr > th {
            color: #212529;
            background-color: #f3f4f7;
            font-weight: 600;
        }

        .table.det {
            margin-bottom: 0;
            background-color: #ffffff;
        }

        .table-inner-wrapper {
            padding: 4px 0;
        }

        .section-label {
            font-weight: 700;
        }

        .section-subtitle {
            font-weight: 600;
        }

        .text-right-strong {
            font-weight: 700;
            text-align: right;
        }

        .highlight-row {
            background-color: #f8fafc;
            font-weight: 600;
        }

        .note-text {
            font-size: 9px;
            color: #555;
        }

        .pagenum:before {
            content: counter(page);
        }

        footer {
            position: fixed;
            bottom: -50px;
            left: 0;
            right: 0;
            height: 40px;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9px;
            color: #666;
            border-top: 1px solid #d1d5db;
            padding: 6px 24px 0 24px;
            background-color: #ffffff;
        }

        footer i {
            color: #777;
        }

        footer table {
            width: 100%;
        }

        footer td:first-child {
            text-align: left;
        }

        /* Hindari pemotongan isi tabel di tengah baris saat print */
        table {
            page-break-inside: auto;
        }

        tr {
            page-break-inside: avoid;
            page-break-after: auto;
        }

        /* Terbilang & catatan */
        .terbilang-label {
            font-weight: 700;
            font-size: 10px;
        }

        .terbilang-text {
            font-style: italic;
            font-size: 10px;
        }

        .section-divider-row td {
            border: none;
            text-align: center;
            padding: 6px 0;
            color: #999;
        }
    </style>

</head>
<body>
    <footer>
        <table>
            <tr>
                <td>
                    <i>Dicetak melalui Aplikasi eASB ${new Date().getFullYear()} - ${getOpd(data.dataAsb)}</i>
                </td>
                <td class="text-right">
                    Halaman | <span class="pagenum"></span>
                </td>
            </tr>
        </table>
    </footer>

    <div class="container-fluid report-wrapper">
        <div class="report-header text-center">
            <div class="report-title">
                <u>${title}</u>
            </div>
            <div class="report-meta text-left">
                Tanggal Cetak: <span>${tanggal_cetak}</span>
            </div>
        </div>

        <!-- I. DATA GENERAL -->
        <table class="table table-hover table-condensed table-striped section-table">
            <thead>
                <tr>
                    <th class="text-center section-label">I.</th>
                    <th class="text-left section-subtitle">Data General</th>
                    <th class="text-center" style="width:3%;"></th>
                    <th class="text-center" style="width:60%;"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>Perangkat Daerah</td>
                    <td>:</td>
                    <td>${getOpd(dataAsb)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Alamat</td>
                    <td>:</td>
                    <td>${dataAsb.alamat ?? ''}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Nama Bangunan</td>
                    <td>:</td>
                    <td>${getNama(dataAsb)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tahun Anggaran</td>
                    <td>:</td>
                    <td>${getTahun(dataAsb)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Jumlah Lantai Tingkat Atas</td>
                    <td>:</td>
                    <td>${getTotalLantai(dataAsb)}</td>
                </tr>
                ${asbDetailsReview}
                <tr class="highlight-row">
                    <td></td>
                    <td>Luas Total Bangunan</td>
                    <td>:</td>
                    <td>${number_format(totalLuas)} m<sup>2</sup></td>
                </tr>
                <tr class="highlight-row">
                    <td></td>
                    <td>Koefesien Tingkat Lantai</td>
                    <td>:</td>
                    <td>${dataAsb.koefisienLantaiTotal}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Fungsi Bangunan Ruang</td>
                    <td>:</td>
                    <td></td>
                </tr>
                ${detailFungsiRows}
                <tr>
                    <td></td>
                    <td>Koefesien Fungsi Bangunan</td>
                    <td>:</td>
                    <td>${dataAsb.koefisienFungsiRuangTotal}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Tipe Bangunan</td>
                    <td>:</td>
                    <td>${tipe_bangunan}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Klasifikasi Bangunan</td>
                    <td>:</td>
                    <td>${getKlasifikasi(dataAsb)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>Lokasi Bangunan</td>
                    <td>:</td>
                    <td>${getKabKota(dataAsb)}</td>
                </tr>
            </tbody>
        </table>

        <!-- II. DATA ANALISIS -->
        <table class="table table-hover table-condensed table-striped section-table">
            <thead>
                <tr>
                    <th class="text-center section-label">II.</th>
                    <th class="text-left section-subtitle" colspan="2">Data Analisis</th>
                    <th style="width:60%;"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="2%"></td>
                    <td width="2%">1.</td>
                    <td colspan="2">Undang Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td>
                </tr>
                <tr>
                    <td></td>
                    <td>2.</td>
                    <td colspan="2">Peraturan Pemerintah Nomor 16 Tahun 2021 tentang Peraturan Pelaksanaan Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td>
                </tr>
                <tr>
                    <td></td>
                    <td>3.</td>
                    <td colspan="2">Peraturan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 22 Tahun 2018 tentang Pembangunan Bangunan Gedung Negara</td>
                </tr>
                <tr>
                    <td></td>
                    <td>4.</td>
                    <td colspan="2">Keputusan Menteri PUPR Nomor 1044/KPTS/M/2018 tentang Koefisien / Faktor Pengali Jumlah Lantai Bangunan Gedung Negara</td>
                </tr>
                <tr>
                    <td></td>
                    <td>5.</td>
                    <td colspan="2">Peraturan Kepala Daerah Harga Satuan Pemerintah Provinsi Jawa Timur Tahun Anggaran 2024</td>
                </tr>
            </tbody>
        </table>

        <!-- III. ANALISIS BIAYA KONSTRUKSI FISIK -->
        <table class="table table-hover table-condensed table-striped section-table">
            <thead>
                <tr>
                    <th class="text-center section-label" width="2%">III.</th>
                    <th class="text-left section-subtitle" colspan="5">
                        Analisis Biaya Pembangunan Konstruksi Fisik ${tipe_bangunan}
                    </th>
                </tr>
            </thead>
            <tbody>
                <!-- SHST -->
                <tr>
                    <td width="2%"></td>
                    <td width="2%" class="font-weight-bold">1.</td>
                    <td class="text-left font-weight-bold" colspan="4">Standar Harga Satuan Tertinggi (SHST)</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="3">
                        1 m<sup>2</sup> Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)} di ${getKabKota(dataAsb)}
                    </td>
                    <td class="text-right font-weight-bold">
                        ${number_format(shst || 0)}
                    </td>
                </tr>

                <!-- BPS -->
                <tr>
                    <td></td>
                    <td class="font-weight-bold">2.</td>
                    <td class="text-left font-weight-bold" colspan="4">Kebutuhan Biaya Pekerjaan Standar</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        <div class="table-inner-wrapper">
                            <table class="table det table-condensed">
                                <thead>
                                    <tr>
                                        <th class="text-center">No.</th>
                                        <th class="text-center">Komponen Bangunan</th>
                                        <th class="text-center">Bobot</th>
                                        <th class="text-center">Jumlah Rincian Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bpsRows}
                                    <tr class="highlight-row">
                                        <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Standar</b></i></td>
                                        <td class="text-right"><b>${number_format(sumBps)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        Biaya Pekerjaan Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        Biaya Pekerjaan Standar = ${dataAsb.} x ${number_format(shst || 0)} m<sup>2</sup> x ${dataAsb.koefisienLantaiTotal} x ${dataAsb.koefisienFungsiRuangTotal} x ${number_format(dataAsb.luasTotalBangunan || 0)} m<sup>2</sup>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left font-weight-bold" colspan="3">Biaya Pekerjaan Standar</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(sumBps)}
                    </td>
                </tr>

                <!-- BPNS -->
                <tr>
                    <td></td>
                    <td class="font-weight-bold">3.</td>
                    <td class="text-left font-weight-bold" colspan="4">Kebutuhan Biaya Pekerjaan Non Standar</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        <div class="table-inner-wrapper">
                            <table class="table det table-condensed">
                                <thead>
                                    <tr>
                                        <th class="text-center">No.</th>
                                        <th class="text-center">Komponen Non Standar</th>
                                        <th class="text-center">Used</th>
                                        <th class="text-center">Rincian Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bpnsRows}
                                    <tr class="highlight-row">
                                        <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Non Standar</b></i></td>
                                        <td class="text-right"><b>${number_format(sumBpns)}</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        Biaya Pekerjaan Non Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4">
                        Biaya Pekerjaan Standar = ${jbobotNsKoef} x ${number_format(shst || 0)} m<sup>2</sup> x ${number_format(koefLantai, 2)} x ${number_format(koefFungsi, 2)} x ${number_format(totalLuas)} m<sup>2</sup>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left font-weight-bold" colspan="3">Biaya Pekerjaan Standar</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(sumBpns)}
                    </td>
                </tr>

                <tr class="section-divider-row">
                    <td colspan="6">-</td>
                </tr>

                <!-- Rekapitulasi -->
                <tr>
                    <td></td>
                    <td class="font-weight-bold">4.</td>
                    <td class="text-left font-weight-bold" colspan="4">
                        Rekapitulasi Biaya Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="3">- Biaya Pekerjaan Standar</td>
                    <td class="text-right">${number_format(sumBps)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="3">- Biaya Pekerjaan Non Standar</td>
                    <td class="text-right">${number_format(sumBpns)}</td>
                </tr>
                <tr class="highlight-row">
                    <td></td>
                    <td></td>
                    <td class="text-left font-weight-bold" colspan="3">
                        - Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}
                    </td>
                    <td class="text-right font-weight-bold">${number_format(totalBiayaKonstruksi)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td class="text-left" colspan="4"><i>*Bobot Non Standar maks. 150% Bobot Standar</i></td>
                </tr>
            </tbody>
        </table>

        <!-- IV. ANALISIS BIAYA PEMBANGUNAN KONSTRUKSI FISIK (FINAL) -->
        <table class="table table-hover table-condensed table-striped section-table">
            <thead>
                <tr>
                    <th class="text-center section-label" width="2%">IV.</th>
                    <th class="text-left section-subtitle" colspan="3">Analisis Biaya Pembangunan Konstruksi Fisik </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td width="2%"></td>
                    <td width="2%">a.</td>
                    <td class="text-left" width="76%">Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td>
                    <td class="text-right font-weight-bold">${number_format(totalBiayaKonstruksi)}</td>
                </tr>
                <tr>
                    <td></td>
                    <td>b.</td>
                    <td class="text-left">Biaya Perencanaan Konstruksi</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(jakonPerencanaan)}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>c.</td>
                    <td class="text-left">Biaya Pengawasan Konstruksi</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(jakonPengawasan)}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>d.</td>
                    <td class="text-left">Biaya Manajemen Konstruksi</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(jakonManagement)}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>e.</td>
                    <td class="text-left">Biaya Pengelolaan Kegiatan</td>
                    <td class="text-right font-weight-bold">
                        ${number_format(jakonPengelolaan)}
                    </td>
                </tr>
                <tr class="highlight-row">
                    <td class="text-right" colspan="3">Total</td>
                    <td class="text-right font-weight-bold">${number_format(totalFinal)}</td>
                </tr>
                <tr>
                    <td class="text-right" colspan="3"><i><b>Dibulatkan</b></i></td>
                    <td class="text-right font-weight-bold">${number_format(totalFinalRounded)}</td>
                </tr>

                <tr>
                    <td colspan="4" class="terbilang-label"><b>Terbilang:</b></td>
                </tr>

                <tr>
                    <td colspan="4" class="terbilang-text">
                        ${terbilang(totalFinalRounded)} Rupiah
                    </td>
                </tr>
            </tbody>
        </table>

        <p class="note-text">
            *Nilai perencanaan, pengawasan, dan manajemen konstruksi merupakan harga satuan tertinggi yang digunakan sebagai plafon anggaran, apabila terdapat rekomendasi dari Dinas Pembina,
            yaitu Dinas Pekerjaan Umum Cipta Karya maka SKPD dapat menyesuaikan anggaran menggunakan koefisien dalam SIPD.
        </p>
    </div>
</body>
</html>
        `;
    }
}
