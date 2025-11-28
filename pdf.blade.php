<!DOCTYPE html>
<html>

<head>
    <title>Kertas Kerja - {{ $data->nama ?? '' }}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <style type="text/css">
        .table-condensed>thead>tr>th,
        .table-condensed>tbody>tr>th,
        .table-condensed>tfoot>tr>th,
        .table-condensed>thead>tr>td,
        .table-condensed>tbody>tr>td,
        .table-condensed>tfoot>tr>td {
            padding: 2px;
        }

        .table>thead>tr>th {
            vertical-align: middle;
            color: white;
            background-color: #192841;
        }

        .table.det>thead>tr>th {
            vertical-align: middle;
            color: black;
            background-color: #f2f2f2;
        }

        .pagenum:before {
            content: counter(page);
        }

        footer {
            position: fixed;
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
                <td><i>Dicetak melalui Aplikasi eASB {{ date('Y') }} - Biro Administrasi Pembangunan Sekretariat Daerah
                        Provinsi Jawa Timur</i></td>
                <td class="text-right">Halaman | <span class="pagenum"></span></td>
            </tr>
        </table>
    </footer>

    <div class="text-center" style="font-family: Arial, Helvetica, sans-serif; font-size: 18px;">
        <b><u>{{ $title }}</b></u></div>
    <p style="font-size: 10px; padding-top:10px;">
        Tanggal Cetak: {{ $date }}
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
                <td>{{ $data->opd->opd ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Alamat</td>
                <td>:</td>
                <td>{{ $data->alamat ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Nama Bangunan</td>
                <td>:</td>
                <td>{{ $data->nama ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Tahun Anggaran</td>
                <td>:</td>
                <td>{{ $data->tahun_anggaran ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Jumlah Lantai Tingkat Atas</td>
                <td>:</td>
                <td>{{ $data->total_lantai ?? '' }}</td>
            </tr>
            @php $i = 1 @endphp
            @foreach ($data->detail as $detail)
                <tr>
                    <td></td>
                    <td>- Luas Lantai {{ $i }}</td>
                    <td>:</td>
                    <td>{{ $detail->luas ?? '' }} m<sup>2</sup></td>
                </tr>
                @php $i = $i + 1 @endphp
            @endforeach
            <tr>
                <td></td>
                <td style="font-weight: bold;">Luas Total Bangunan</td>
                <td>:</td>
                <td>{{ number_format((collect($data->detail)->sum('luas')), 0, ',', '.') }} m<sup>2</sup></td>
            </tr>
            <tr>
                <td></td>
                <td style="font-weight: bold;">Koefesien Tingkat Lantai</td>
                <td>:</td>
                <td>{{  number_format((collect($data->detail)->sum('lantai_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Fungsi Bangunan Ruang</td>
                <td>:</td>
                <td></td>
            </tr>
            @php $i = 1 @endphp
            @foreach ($data->detail as $detail)
                <tr>
                    <td></td>
                    <td>- Fungsi Lantai {{ $i }}</td>
                    <td>:</td>
                    <td>{{ $detail->fungsibangunan->nama ?? '' }} </td>
                </tr>
                @php $i = $i + 1 @endphp
            @endforeach
            <tr>
                <td></td>
                <td style="font-weight: bold;">Koefesien Fungsi Bangunan</td>
                <td>:</td>
                <td>{{ number_format((collect($data->detail)->sum('fungsibangunan_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td></td>
                <td>Tipe Bangunan</td>
                <td>:</td>
                <td>{{ $data->tipebangunan->tipe_bangunan ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Klasifikasi Bangunan</td>
                <td>:</td>
                <td>{{ $data->klasifikasibangunan->klasifikasi ?? '' }}</td>
            </tr>
            <tr>
                <td></td>
                <td>Lokasi Bangunan</td>
                <td>:</td>
                <td>{{ $data->kabkota->kabkota ?? '' }}</td>
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
                <td>Peraturan Pemerintah Nomor 16 Tahun 2021 tentang Peraturan Pelaksanaan Undang Nomor 28 Tahun 2002
                    tentang Bangunan Gedung</td>
            </tr>
            <tr>
                <td></td>
                <td>3.</td>
                <td>Peraturan Menteri Pekerjaan Umum dan Perumahan Rakyat Nomor 22 Tahun 2018 tentang Pembangunan
                    Bangunan Gedung Negara</td>
            </tr>
            <tr>
                <td></td>
                <td>4.</td>
                <td>Keputusan Menteri PUPR Nomor 1044/KPTS/M/2018 tentang Koefisien / Faktor Pengali Jumlah Lantai
                    Bangunan Gedung Negara</td>
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
                <th class="text-left" colspan="5">Analisis Biaya Pembangunan Konstruksi Fisik
                    {{ $data->tipebangunan->tipe_bangunan ?? '' }}</th>
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
                <td class="text-left" colspan="3">1 m<sup>2</sup> Konstruksi Fisik
                    {{ $data->tipebangunan->tipe_bangunan ?? '' }} {{ $data->klasifikasibangunan->klasifikasi ?? '' }}
                    di {{ $data->kabkota->kabkota ?? '' }}</td>
                <td style="font-weight: bold;" class="text-right">
                    {{ number_format($shst, 0, '.', ',') }}
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
                            <tr style="font-weight: bold; background-color: #fff;" ;>
                                <th class="text-center">No.</th>
                                <th class="text-center">Komponen Bangunan</th>
                                <th class="text-center">Bobot</th>
                                <th class="text-center">Jumlah Rincian Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php $i = 1;
                                $sum = 0;
                            $jbobotKoef = 0; @endphp
                            @foreach($bps as $row)
                                <tr>
                                    <td class="text-center">{{ $i }}</td>
                                    <td>{{ $row->komponen }}</td>
                                    <td class="text-right">
                                        {{ $row->asb->bobot_input ?? '-' }} %
                                        @if(!empty($row->asb->jumlah_bobot))
                                            @php $jbobotKoef = $jbobotKoef + $row->asb->jumlah_bobot; @endphp
                                        @endif
                                    </td>
                                    <td class="text-right">
                                        @if(!empty($row->asb->rincian_harga))
                                            {{ number_format($row->asb->rincian_harga, 0, ',', '.') }}
                                            @php $sum = $sum + $row->asb->rincian_harga; @endphp
                                        @else
                                            -
                                        @endif
                                    </td>
                                </tr>
                                @php $i = $i + 1;  @endphp
                            @endforeach
                            <tr>
                                <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Standar</b></i></td>
                                <td class="text-right"><b>{{   number_format($sum, 0, ',', '.') }}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">Biaya Pekerjaan Standar = Bobot (%) x SHST x KLB x KFB x Luas Lantai
                    Bangunan</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>

                <td class="text-left" colspan="4">
                    Biaya Pekerjaan Standar = {{ $jbobotKoef }} x {{ number_format($shst, 0, ',', '.') }} m<sup>2</sup> x
                    {{ number_format((collect($data->detail)->sum('lantai_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                    x
                    {{ number_format((collect($data->detail)->sum('fungsibangunan_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                    x {{ number_format((collect($data->detail)->sum('luas')), 0, ',', '.') }} m<sup>2</sup>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">Biaya Pekerjaan Standar</td>
                <td class="text-right" style="font-weight: bold;">
                    {{-- {{ number_format($jbobotKoef*$shst*(collect($data->detail)->sum('lantai_koef') /
                    collect($data->detail)->sum('luas'))*(collect($data->detail)->sum('fungsibangunan_koef') /
                    collect($data->detail)->sum('luas'))*collect($data->detail)->sum('luas'),0,',','.') }} --}}
                    {{   number_format($sum, 0, ',', '.') }}
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
                            <tr style="font-weight: bold; background-color: #fff;" ;>
                                <th class="text-center">No.</th>
                                <th class="text-center">Komponen Non Standar</th>
                                <th class="text-center">Used</th>
                                <th class="text-center">Rincian Harga</th>
                            </tr>
                        </thead>
                        <tbody>
                            @php $i = 1;
                                $sumbpns = 0;
                            $jbobotNsKoef = 0; @endphp
                            @foreach($bpns as $row)
                                <tr>
                                    <td class="text-center">{{ $i }}</td>
                                    <td>{{ $row->komponen }}</td>
                                    <td class="text-right">
                                        {{ $row->asb->bobot_input ?? '-' }} %
                                        @if(!empty($row->asb->jumlah_bobot))
                                            @php $jbobotNsKoef = $jbobotNsKoef + $row->asb->jumlah_bobot; @endphp
                                        @endif
                                    </td>
                                    <td class="text-right">
                                        @if(!empty($row->asb->rincian_harga))
                                            {{ number_format($row->asb->rincian_harga, 0, ',', '.') }}
                                            @php $sumbpns = $sumbpns + $row->asb->rincian_harga; @endphp
                                        @else
                                            -
                                        @endif
                                    </td>
                                </tr>
                                @php $i = $i + 1;  @endphp
                            @endforeach
                            <tr>
                                <td class="text-right" colspan="3"><i><b>Total Kebutuhan Biaya Non Standar</b></i></td>
                                <td class="text-right"><b>{{   number_format($sumbpns, 0, ',', '.') }}</b></td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="4">Biaya Pekerjaan Non Standar = Bobot (%) x SHST x KLB x KFB x Luas
                    Lantai Bangunan</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>

                <td class="text-left" colspan="4">
                    Biaya Pekerjaan Standar = {{ $jbobotNsKoef }} x {{ number_format($shst, 0, ',', '.') }} m<sup>2</sup> x
                    {{ number_format((collect($data->detail)->sum('lantai_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                    x
                    {{ number_format((collect($data->detail)->sum('fungsibangunan_koef') / collect($data->detail)->sum('luas')), 2, ',', '.') }}
                    x {{ number_format((collect($data->detail)->sum('luas')), 0, ',', '.') }} m<sup>2</sup>
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">Biaya Pekerjaan Standar</td>
                <td class="text-right" style="font-weight: bold;">
                    {{-- {{ number_format($jbobotKoef*$shst*(collect($data->detail)->sum('lantai_koef') /
                    collect($data->detail)->sum('luas'))*(collect($data->detail)->sum('fungsibangunan_koef') /
                    collect($data->detail)->sum('luas'))*collect($data->detail)->sum('luas'),0,',','.') }} --}}
                    {{   number_format($sumbpns, 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td colspan="6" class="text-center">-</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%" style="font-weight: bold;">4.</td>
                <td class="text-left" colspan="4"><b>Rekapitulasi Biaya Konstruksi Fisik
                        {{ $data->tipebangunan->tipe_bangunan ?? '' }}
                        {{ $data->klasifikasibangunan->klasifikasi ?? '' }}</b></td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3">- Biaya Pekerjaan Standar</td>
                <td class="text-right">{{   number_format($sum, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3">- Biaya Pekerjaan Non Standar</td>
                <td class="text-right">{{   number_format($sumbpns, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%"></td>
                <td class="text-left" colspan="3" style="font-weight: bold;">- Biaya Konstruksi
                    {{ $data->tipebangunan->tipe_bangunan ?? '' }} {{ $data->klasifikasibangunan->klasifikasi ?? '' }}
                </td>
                <td class="text-right" style="font-weight: bold;">{{   number_format(($sum + $sumbpns), 0, ',', '.') }}
                </td>
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
                <td class="text-left" colspan="" width="76%">Biaya Konstruksi
                    {{ $data->tipebangunan->tipe_bangunan ?? '' }} {{ $data->klasifikasibangunan->klasifikasi ?? '' }}
                </td>
                <td class="text-right" style="font-weight: bold;">{{ number_format(($sum + $sumbpns), 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">b.</td>
                <td class="text-left" colspan="">Biaya Perencanaan Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    @php $jakonPerencanaan = jakon((bulatbulatnom($sum + $sumbpns)), 'perencanaan', $data->asb_jenis) @endphp
                    {{ number_format($jakonPerencanaan, 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">c.</td>
                <td class="text-left" colspan="">Biaya Pengawasan Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    @php $jakonPengawasan = jakon((bulatbulatnom($sum + $sumbpns)), 'pengawasan', $data->asb_jenis) @endphp
                    {{ number_format($jakonPengawasan, 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">d.</td>
                <td class="text-left" colspan="">Biaya Manajemen Konstruksi</td>
                <td class="text-right" style="font-weight: bold;">
                    @php $jakonManagement = jakon((bulatbulatnom($sum + $sumbpns)), 'management', $data->asb_jenis) @endphp
                    {{ number_format($jakonManagement, 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td width="2%"></td>
                <td width="2%">e.</td>
                <td class="text-left" colspan="">Biaya Pengelolaan Kegiatan</td>
                <td class="text-right" style="font-weight: bold;">
                    @php $jakonPengelolaan = jakon((bulatbulatnom($sum + $sumbpns)), 'pengelolaan', $data->asb_jenis) @endphp
                    {{ number_format($jakonPengelolaan, 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td class="text-right" colspan="3">Total</td>
                <td class="text-right" style="font-weight: bold;">
                    {{ number_format(($sum + $sumbpns + $jakonPerencanaan + $jakonPengawasan + $jakonManagement + $jakonPengelolaan), 0, ',', '.') }}
                </td>
            </tr>
            <tr>
                <td class="text-right" colspan="3"><i><b>Dibulatkan</b></i></td>
                <td class="text-right" style="font-weight: bold;">
                    {{ bulatbulat($sum + $sumbpns + $jakonPerencanaan + $jakonPengawasan + $jakonManagement + $jakonPengelolaan) }}
                </td>
            </tr>

            <tr>
                <td class="text-left" colspan="4" style="font-weight: bold;"><b>Terbilang:</b></td>
            </tr>

            <tr>
                <td class="text-left" colspan="4">
                    <i>{{ ucwords(\Terbilang::make(bulatbulatnom($sum + $sumbpns + $jakonPerencanaan + $jakonPengawasan + $jakonManagement + $jakonPengelolaan))) }}
                        Rupiah</i></td>
            </tr>
        </tbody>
    </table>

    <p style="font-size:10px;">
        *Nilai perencanaan, pengawasan, dan manajemen konstruksi merupakan harga satuan tertinggi yang digunakan sebagai
        plafon anggaran, apabila terdapat rekomendasi dari Dinas Pembina,
        yaitu Dinas Pekerjaan Umum Cipta Karya maka SKPD dapat menyesuaikan anggaran menggunakan koefisien dalam SIPD
    </p>

</body>

</html>


@php
    \App\Models\Asb::where(['id' => $data->id])->update([
        'perencanaan_konstruksi' => $jakonPerencanaan,
        'pengawasan_konstruksi' => $jakonPengawasan,
        'management_konstruksi' => $jakonManagement,
        'pengelolaan_kegiatan' => $jakonPengelolaan
    ])
@endphp