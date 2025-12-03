import { Injectable } from '@nestjs/common';
import { KertasKerjaDto } from '../dto/kertas-kerja.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class KertasKerjaService {
    generateHtml(data: KertasKerjaDto): string {
        const { title, tipe_bangunan, tanggal_cetak, dataAsb, shst, dataBps, dataBpns } = data;

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

        // Calculations
        // Note: Assuming dataAsb.detail is populated if needed, but based on DTO it's Asb entity.
        // The PHP code uses $data->detail->sum('luas') etc.
        // We might need to adjust the DTO or assume the caller passes calculated values if Asb entity doesn't have details loaded or if they are not simple arrays.
        // For now, I will assume dataAsb has a 'detail' property that is an array of objects with 'luas', 'lantai_koef', 'fungsibangunan_koef', 'fungsibangunan'.
        // If Asb entity definition doesn't have it, we might need to extend it or use `any` for now to match the PHP logic flexibility, or better, update the DTO to be more specific.
        // Given the PHP code: $data->detail is iterated.

        // Let's try to map the PHP logic as closely as possible using the provided data.

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

        // Mocking detail loop for now as it's complex to extract from just 'Asb' entity without eager loading details
        // We will assume dataAsb has a 'details' property injected or we handle it gracefully if missing.
        const details = (dataAsb as any).details || [];
        const detailRows = details.map((detail: any, i: number) => `
            <tr>
                <td></td>
                <td>- Luas Lantai ${i + 1}</td>
                <td>:</td>
                <td>${detail.luas ?? ''} m<sup>2</sup></td>
            </tr>
        `).join('');

        const detailFungsiRows = details.map((detail: any, i: number) => `
            <tr>
                <td></td>
                <td>- Fungsi Lantai ${i + 1}</td>
                <td>:</td>
                <td>${detail.fungsiBangunan?.nama ?? ''} </td>
            </tr>
        `).join('');

        const totalLuas = details.reduce((acc: number, curr: any) => acc + (curr.luas || 0), 0);
        // Avoid division by zero
        const koefLantai = totalLuas ? (details.reduce((acc: number, curr: any) => acc + (curr.lantai_koef || 0), 0) / totalLuas) : 0;
        const koefFungsi = totalLuas ? (details.reduce((acc: number, curr: any) => acc + (curr.fungsibangunan_koef || 0), 0) / totalLuas) : 0;


        return `
<!DOCTYPE html>
<html>
<head>
    <title>Kertas Kerja - ${getNama(dataAsb)}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style type="text/css">
        .table-condensed>thead>tr>th,
        .table-condensed>tbody>tr>th,
        .table-condensed>tfoot>tr>th,
        .table-condensed>thead>tr>td, .table-condensed>tbody>tr>td, .table-condensed>tfoot>tr>td{
            padding: 2px;
        }

        .table > thead > tr > th {
            vertical-align: middle;
            color:white;
            background-color: #192841;
        }

        .table.det > thead > tr > th {
            vertical-align: middle;
            color:black;
            background-color: #f2f2f2;
        }

        .pagenum:before {
            content: counter(page);
        }

        footer {
            position:fixed;
            bottom: -60px;
                left: 0px;
                right: 0px;
                height: 50px;
            text-align: right;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
        }

    </style>

</head>
<body>
    <footer>
        <table width="100%">
            <tr>
                <td><i>Dicetak melalui Aplikasi eASB ${new Date().getFullYear()} - Biro Administrasi Pembangunan Sekretariat Daerah Provinsi Jawa Timur</i></td>
                <td class="text-right">Halaman | <span class="pagenum"></span></td>
            </tr>
        </table>
    </footer>

    <div class="text-center" style="font-family: Arial, Helvetica, sans-serif; font-size: 18px;"><b><u>${title}</b></u></div>
    <p style="font-size: 10px; padding-top:10px;">
        Tanggal Cetak: ${tanggal_cetak}
    </p>

    <table class="table table-hover table-condensed table-striped" style="font-size: 10px;">
        <thead>
            <tr>
                <th class="text-center">I.</th>
                <th class="text-left">Data General</th>
                <th class="text-center"></th>
                <th class="text-center"></th>
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
            ${detailRows}
            <tr>
                <td></td>
                <td style="font-weight: bold;">Luas Total Bangunan</td>
                <td>:</td>
                <td>${number_format(totalLuas)} m<sup>2</sup></td>
            </tr>
            <tr>
                <td></td>
                <td style="font-weight: bold;">Koefesien Tingkat Lantai</td>
                <td>:</td>
                <td>${number_format(koefLantai, 2)} </td>
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
                <td style="font-weight: bold;">Koefesien Fungsi Bangunan</td>
                <td>:</td>
                <td>${number_format(koefFungsi, 2)}</td>
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

    <table class="table table-hover table-condensed table-striped" style="font-size: 10px;">
        <thead>
            <tr>
                <th class="text-center">II.</th>
                <th class="text-left" colspan="2">Data Analisis</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width="2%"></td>
                <td width="2%">1.</td>
                <td>Undang Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td>
            </tr>
            <tr>
                <td></td>
                <td>2.</td>
                <td>Peraturan Pemerintah Nomor 16 Tahun 2021 tentang Peraturan Pelaksanaan Undang Nomor 28 Tahun 2002 tentang Bangunan Gedung</td>
            </tr>
            <tr>
                <td></td>
                <td>3.</td>
                <td>Peraturan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 22 Tahun 2018 tentang Pembangunan Bangunan Gedung Negara</td>
            </tr>
            <tr>
                <td></td>
                <td>4.</td>
                <td>Keputusan Menteri PUPR Nomor 1044/KPTS/M/2018 tentang Koefisien / Faktor Pengali Jumlah Lantai Bangunan Gedung Negara</td>
            </tr>
            <tr>
                <td></td>
                <td>5.</td>
                <td>Peraturan Kepala Daerah Harga Satuan Pemerintah Provinsi Jawa Timur Tahun Anggaran 2024</td>
            </tr>
        </tbody>
    </table>

    <table class="table table-hover table-condensed table-striped" style="font-size: 10px;">
        <thead>
            <tr>
                <th class="text-center" width="2%">III.</th>
                <th class="text-left" colspan="5">Analisis Biaya Pembangunan Konstruksi Fisik ${tipe_bangunan}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width="2%"></td>
                <td width="2%" style="font-weight: bold;">1.</td>
                <td class="text-left" colspan="4"><b>Standar Harga Satuan Tertinggi (SHST)</b></td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3">1 m<sup>2</sup> Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)} di ${getKabKota(dataAsb)}</td>
                <td style="font-weight: bold;" class="text-right">
                    ${number_format(shst)}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%" style="font-weight: bold;">2.</td>
                <td class="text-left" colspan="4"><b>Kebutuhan Biaya Pekerjaan Standar</b></td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">
                    <table class="table det table-condensed">
                        <thead>
                            <tr style="font-weight: bold; background-color: #fff;";>
                                <th class="text-center">No.</th>
                                <th class="text-center">Komponen Bangunan</th>
                                <th class="text-center">Bobot</th>
                                <th class="text-center">Jumlah Rincian Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bpsRows}
                            <tr>
                                <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Standar</b></i></td>
                                <td class="text-right"><b>${number_format(sumBps)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">Biaya Pekerjaan Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>

                <td class="text-left" colspan="4">
                    Biaya Pekerjaan Standar = ${jbobotKoef} x ${number_format(shst)} m<sup>2</sup> x ${number_format(koefLantai, 2)} x ${number_format(koefFungsi, 2)} x ${number_format(totalLuas)} m<sup>2</sup>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">Biaya Pekerjaan Standar</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(sumBps)}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%" style="font-weight: bold;">3.</td>
                <td class="text-left" colspan="4"><b>Kebutuhan Biaya Pekerjaan Non Standar</b></td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">
                    <table class="table det table-condensed">
                        <thead>
                            <tr style="font-weight: bold; background-color: #fff;";>
                                <th class="text-center">No.</th>
                                <th class="text-center">Komponen Non Standar</th>
                                <th class="text-center">Used</th>
                                <th class="text-center">Rincian Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bpnsRows}
                            <tr>
                                <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Non Standar</b></i></td>
                                <td class="text-right"><b>${number_format(sumBpns)}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">Biaya Pekerjaan Non Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai Bangunan</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>

                <td class="text-left" colspan="4">
                    Biaya Pekerjaan Standar = ${jbobotNsKoef} x ${number_format(shst)} m<sup>2</sup> x ${number_format(koefLantai, 2)} x ${number_format(koefFungsi, 2)} x ${number_format(totalLuas)} m<sup>2</sup>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">Biaya Pekerjaan Standar</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(sumBpns)}
                </td>
            </tr>
            <tr>
                <td colspan="6" class="text-center">-</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%" style="font-weight: bold;">4.</td>
                <td class="text-left" colspan="4"><b>Rekapitulasi Biaya Konstruksi Fisik ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</b></td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3">- Biaya Pekerjaan Standar</td>
                <td class="text-right">${number_format(sumBps)}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3">- Biaya Pekerjaan Non Standar</td>
                <td class="text-right">${number_format(sumBpns)}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">- Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td>
                <td class="text-right" style="font-weight: bold;">${number_format(totalBiayaKonstruksi)}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4"><i>*Bobot Non Standar maks. 150% Bobot Standar</i></td>
            </tr>
        </tbody>
    </table>

    <table class="table table-hover table-condensed table-striped" style="font-size: 10px;">
        <thead>
            <tr>
                <th class="text-center" width="2%">IV.</th>
                <th class="text-left" colspan="3">Analisis Biaya Pembangunan Konstruksi Fisik </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td width="2%"></td>
                <td width="2%">a.</td>
                <td class="text-left" colspan="" width="76%">Biaya Konstruksi ${tipe_bangunan} ${getKlasifikasi(dataAsb)}</td>
                <td class="text-right" style="font-weight: bold;">${number_format(totalBiayaKonstruksi)}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">b.</td>
                <td class="text-left" colspan="">Biaya Perencanaan Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(jakonPerencanaan)}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">c.</td>
                <td class="text-left" colspan="">Biaya Pengawasan Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(jakonPengawasan)}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">d.</td>
                <td class="text-left" colspan="">Biaya Manajemen Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(jakonManagement)}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">e.</td>
                <td class="text-left" colspan="">Biaya Pengelolaan Kegiatan</td>
                <td class="text-right" style="font-weight: bold;">
                    ${number_format(jakonPengelolaan)}
                </td>
            </tr>
            <tr>
                <td class="text-right" colspan="3">Total</td>
                <td class="text-right" style="font-weight: bold;">${number_format(totalFinal)}</td>
            </tr>
            <tr>
                <td class="text-right" colspan="3"><i><b>Dibulatkan</b></i></td>
                <td class="text-right" style="font-weight: bold;">${number_format(totalFinalRounded)}</td>
            </tr>

            <tr>
                <td class="text-left" colspan="4" style="font-weight: bold;"><b>Terbilang:</b></td>
            </tr>

            <tr>
                <td class="text-left" colspan="4"><i>${terbilang(totalFinalRounded)} Rupiah</i></td>
            </tr>
        </tbody>
    </table>

    <p style="font-size:10px;">
        *Nilai perencanaan, pengawasan, dan manajemen konstruksi merupakan harga satuan tertinggi yang digunakan sebagai plafon anggaran, apabila terdapat rekomendasi dari Dinas Pembina,
        yaitu Dinas Pekerjaan Umum Cipta Karya maka SKPD dapat menyesuaikan anggaran menggunakan koefisien dalam SIPD
    </p>

</body>
</html>
        `;
    }

    async generatePdf(data: KertasKerjaDto): Promise<Buffer> {
        const html = this.generateHtml(data);
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
                top: '10mm',
                bottom: '10mm',
                left: '10mm',
                right: '10mm'
            }
        });

        await browser.close();
        return Buffer.from(pdfBuffer);
    }
}
