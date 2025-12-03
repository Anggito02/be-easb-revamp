import { KertasKerjaService } from './src/common/services/kertas-kerja.service';
import { KertasKerjaDto } from './src/common/dto/kertas-kerja.dto';
import * as fs from 'fs';

const service = new KertasKerjaService();

const mockAsb: any = {
    id: 1,
    namaAsb: 'Gedung Kantor',
    alamat: 'Jl. Jend. Sudirman No. 1',
    tahunAnggaran: 2024,
    totalLantai: 2,
    opd: { opd: 'Dinas PU' },
    kabkota: { kabkota: 'Surabaya' },
    asbKlasifikasi: { klasifikasi: 'Sederhana' },
    asbTipeBangunan: { tipeBangunan: 'Gedung Negara' },
    perencanaanKonstruksi: 5000000,
    pengawasanKonstruksi: 3000000,
    managementKonstruksi: 2000000,
    pengelolaanKegiatan: 1000000,
    details: [
        { luas: 100, lantai_koef: 100, fungsibangunan_koef: 100, fungsiBangunan: { nama: 'Kantor' } },
        { luas: 100, lantai_koef: 100, fungsibangunan_koef: 100, fungsiBangunan: { nama: 'Gudang' } }
    ]
};

const dto: KertasKerjaDto = {
    title: 'Kertas Kerja Perhitungan',
    tipe_bangunan: 'Gedung Negara',
    tanggal_cetak: '04 Desember 2024',
    dataAsb: mockAsb,
    shst: 5000000,
    dataBps: [
        { komponen: 'Pondasi', asb: { bobot_input: 10, jumlah_bobot: 10, rincian_harga: 50000000 } },
        { komponen: 'Struktur', asb: { bobot_input: 20, jumlah_bobot: 20, rincian_harga: 100000000 } }
    ],
    dataBpns: [
        { komponen: 'AC', asb: { bobot_input: 5, jumlah_bobot: 5, rincian_harga: 25000000 } }
    ]
};

async function run() {
    console.log('Generating PDF...');
    try {
        const pdfBuffer = await service.generatePdf(dto);
        fs.writeFileSync('kertas_kerja_test.pdf', pdfBuffer);
        console.log('PDF generated successfully at kertas_kerja_test.pdf');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
}

run();
