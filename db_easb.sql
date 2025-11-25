-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 06:18 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_easb`
--

-- --------------------------------------------------------

--
-- Table structure for table `asb`
--

CREATE TABLE `asb` (
  `id` int(7) NOT NULL,
  `asb_jenis` int(7) DEFAULT NULL,
  `status_id` int(7) DEFAULT NULL,
  `opd_id` int(7) NOT NULL,
  `rekening_id` int(7) DEFAULT NULL,
  `rekening_id_review` int(7) DEFAULT NULL,
  `tahun_anggaran` varchar(4) DEFAULT NULL,
  `nama` text NOT NULL,
  `alamat` text DEFAULT NULL,
  `kabkota_id` int(7) DEFAULT NULL,
  `jumlah_kontraktor` int(7) DEFAULT NULL,
  `total_lantai` int(7) DEFAULT NULL,
  `tipebangunan_id` int(7) NOT NULL,
  `klasifikasi_id` int(7) DEFAULT NULL,
  `reject_reason` text DEFAULT NULL,
  `shst` double DEFAULT NULL,
  `perencanaan_konstruksi` double DEFAULT NULL,
  `pengawasan_konstruksi` double DEFAULT NULL,
  `management_konstruksi` double DEFAULT NULL,
  `pengelolaan_kegiatan` double DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_bipeknonstandart`
--

CREATE TABLE `asb_bipeknonstandart` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `komponenbarang_id` int(7) DEFAULT NULL,
  `bobot_input` double DEFAULT NULL COMMENT 'prosetase',
  `jumlah_bobot` double DEFAULT NULL,
  `rincian_harga` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction table ::: Biaya Pekerjaan Non Standart';

-- --------------------------------------------------------

--
-- Table structure for table `asb_bipeknonstandart_review`
--

CREATE TABLE `asb_bipeknonstandart_review` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `asb_bipeknonstandartid` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `komponenbarang_id` int(7) DEFAULT NULL,
  `bobot_input` double DEFAULT NULL COMMENT 'prosetase',
  `jumlah_bobot` double DEFAULT NULL,
  `rincian_harga` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction table ::: Biaya Pekerjaan Non Standart';

-- --------------------------------------------------------

--
-- Table structure for table `asb_bipekstandart`
--

CREATE TABLE `asb_bipekstandart` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `komponenbarang_id` int(7) DEFAULT NULL,
  `bobot_input` double DEFAULT NULL COMMENT 'prosetase',
  `bobot_input_prosentase` double DEFAULT NULL,
  `calculation_method` enum('min','avg','max','avg_min','avg_max') DEFAULT NULL,
  `jumlah_bobot` double DEFAULT NULL,
  `rincian_harga` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction table ::: Biaya Pekerjaan Standart';

-- --------------------------------------------------------

--
-- Table structure for table `asb_bipekstandart_review`
--

CREATE TABLE `asb_bipekstandart_review` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `asb_bipekstandartid` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `komponenbarang_id` int(7) DEFAULT NULL,
  `bobot_input` double DEFAULT NULL COMMENT 'prosetase',
  `calculation_method` enum('min','avg','max','avg_min','avg_max') DEFAULT NULL,
  `jumlah_bobot` double DEFAULT NULL,
  `rincian_harga` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction table ::: Biaya Pekerjaan Standart';

-- --------------------------------------------------------

--
-- Table structure for table `asb_bpsgallery`
--

CREATE TABLE `asb_bpsgallery` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `komponenbangunan_id` int(7) DEFAULT NULL,
  `filename` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_detail`
--

CREATE TABLE `asb_detail` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `lantai_id` int(7) DEFAULT NULL,
  `luas` int(7) DEFAULT NULL,
  `lantai_koef` float DEFAULT NULL,
  `fungsibangunan_id` int(7) DEFAULT NULL,
  `fungsibangunan_koef` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction ASB Detail';

-- --------------------------------------------------------

--
-- Table structure for table `asb_detail_review`
--

CREATE TABLE `asb_detail_review` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `asbdetail_id` int(7) DEFAULT NULL,
  `files` enum('origin','review') DEFAULT 'origin',
  `lantai_id` int(7) DEFAULT NULL,
  `luas` int(7) DEFAULT NULL,
  `lantai_koef` float DEFAULT NULL,
  `fungsibangunan_id` int(7) DEFAULT NULL,
  `fungsibangunan_koef` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Transaction ASB Detail';

-- --------------------------------------------------------

--
-- Table structure for table `asb_document`
--

CREATE TABLE `asb_document` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `filename` text DEFAULT NULL,
  `spec` enum('surat_rekomendasi') DEFAULT NULL COMMENT 'lpr = Laporan, mtr = Materi',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_fungsiruang`
--

CREATE TABLE `asb_fungsiruang` (
  `id` int(7) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `koef` float DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Fungsi Ruang dan Koef';

-- --------------------------------------------------------

--
-- Table structure for table `asb_jakon`
--

CREATE TABLE `asb_jakon` (
  `id` int(7) NOT NULL,
  `tahun` varchar(4) DEFAULT NULL,
  `type` enum('perencanaan','pengawasan','management','pengelolaan') DEFAULT NULL,
  `asb_jenis` int(7) DEFAULT NULL,
  `tipebangunan_id` int(7) NOT NULL,
  `klasifikasi_id` int(7) NOT NULL,
  `nama` text DEFAULT NULL,
  `spec` varchar(255) DEFAULT NULL,
  `price_from` double DEFAULT NULL,
  `price_to` double DEFAULT NULL,
  `satuan` varchar(10) DEFAULT NULL,
  `standar` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_jenis`
--

CREATE TABLE `asb_jenis` (
  `id` int(7) NOT NULL,
  `jenis` varchar(255) NOT NULL,
  `asb` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='ASB Pembangunan / Perawatan';

-- --------------------------------------------------------

--
-- Table structure for table `asb_klasifikasi`
--

CREATE TABLE `asb_klasifikasi` (
  `id` int(7) NOT NULL,
  `asb_tipebangunan` int(7) DEFAULT NULL,
  `klasifikasi` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Klasifikasi berdasarkan Fungsi Ruang';

-- --------------------------------------------------------

--
-- Table structure for table `asb_kompbangpros`
--

CREATE TABLE `asb_kompbangpros` (
  `id` int(7) NOT NULL,
  `komponenbangunan_id` int(7) DEFAULT NULL,
  `tipebangunan_id` int(7) DEFAULT NULL,
  `min` double DEFAULT NULL COMMENT 'prosentase',
  `avg_min` double DEFAULT NULL,
  `avg` double DEFAULT NULL COMMENT 'prosentase',
  `avg_max` double DEFAULT NULL,
  `max` int(7) DEFAULT NULL COMMENT 'prosentase',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Komponen Bangunan dengan Koef per Klasifikasi Bangunan';

-- --------------------------------------------------------

--
-- Table structure for table `asb_komponenbangunan`
--

CREATE TABLE `asb_komponenbangunan` (
  `id` int(7) NOT NULL,
  `asb_jenis` varchar(7) DEFAULT NULL,
  `komponen` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Komponen Bangunan (2. Kebutuhan Biaya Pekerjaan Standart)';

-- --------------------------------------------------------

--
-- Table structure for table `asb_komponennonstd`
--

CREATE TABLE `asb_komponennonstd` (
  `id` int(7) NOT NULL,
  `komponen` varchar(255) DEFAULT NULL,
  `bobot_min` double DEFAULT NULL,
  `bobot` double DEFAULT NULL,
  `bobot_max` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Komponen Non Standart + Fix Koef (Permen PU 22/2018)';

-- --------------------------------------------------------

--
-- Table structure for table `asb_lantai`
--

CREATE TABLE `asb_lantai` (
  `id` int(7) NOT NULL,
  `lantai` varchar(255) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL COMMENT 'Basement atau Lantai / alias for primary key',
  `koef` float DEFAULT NULL,
  `satuan` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Lantai + Koef';

-- --------------------------------------------------------

--
-- Table structure for table `asb_log`
--

CREATE TABLE `asb_log` (
  `id` int(7) NOT NULL,
  `asb_id` int(7) DEFAULT NULL,
  `verifikator_id` int(7) DEFAULT NULL,
  `log` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_shst`
--

CREATE TABLE `asb_shst` (
  `id` int(7) NOT NULL,
  `tahun` varchar(4) DEFAULT NULL,
  `tipebangunan_id` int(7) DEFAULT NULL,
  `klasifikasi_id` int(7) DEFAULT NULL,
  `kabkota_id` int(7) DEFAULT NULL,
  `shst` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_status`
--

CREATE TABLE `asb_status` (
  `id` int(7) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asb_tipebangunan`
--

CREATE TABLE `asb_tipebangunan` (
  `id` int(7) NOT NULL,
  `asb_jenis` int(7) NOT NULL,
  `tipe_bangunan` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci COMMENT='Master Tipe Bangunan';

-- --------------------------------------------------------

--
-- Table structure for table `dph`
--

CREATE TABLE `dph` (
  `id` int(8) NOT NULL,
  `filename` text NOT NULL,
  `usulan_id` int(8) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis`
--

CREATE TABLE `jenis` (
  `id` int(11) NOT NULL,
  `jenis` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kabkota`
--

CREATE TABLE `kabkota` (
  `id` int(7) NOT NULL,
  `kabkota` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kamus`
--

CREATE TABLE `kamus` (
  `id` int(11) NOT NULL,
  `kode_komponen` varchar(100) NOT NULL,
  `uraian` text DEFAULT NULL,
  `jenis` varchar(20) DEFAULT NULL,
  `kode_rekening` varchar(100) DEFAULT NULL,
  `uraian_kdrek` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rekening`
--

CREATE TABLE `rekening` (
  `id` int(7) NOT NULL,
  `rekening_kode` varchar(100) DEFAULT NULL,
  `rekening_uraian` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `satuan`
--

CREATE TABLE `satuan` (
  `id` int(11) NOT NULL,
  `satuan` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sptjm`
--

CREATE TABLE `sptjm` (
  `id` int(8) NOT NULL,
  `user_id` int(7) DEFAULT NULL,
  `filename` text DEFAULT NULL,
  `jenis_id` int(8) DEFAULT NULL,
  `is_active` varchar(1) DEFAULT NULL,
  `usulan` enum('belum','proses','selesai') NOT NULL DEFAULT 'belum',
  `session_year` varchar(4) DEFAULT NULL,
  `reject_reason` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usulan`
--

CREATE TABLE `usulan` (
  `id` int(11) NOT NULL,
  `jenis_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `kode_komponen` varchar(255) DEFAULT NULL,
  `uraian` text DEFAULT NULL,
  `spec` text DEFAULT NULL,
  `satuan_id` int(11) DEFAULT NULL,
  `harga_satuan` double DEFAULT NULL,
  `kd_rek_1` varchar(255) DEFAULT NULL,
  `kd_rek_2` varchar(255) DEFAULT NULL,
  `kd_rek_3` varchar(255) DEFAULT NULL,
  `kd_rek_4` varchar(255) DEFAULT NULL,
  `sptjm_id` int(8) DEFAULT NULL,
  `usulan_no` varchar(255) DEFAULT NULL,
  `usulanpackages_id` int(7) DEFAULT NULL,
  `is_sipd` varchar(1) DEFAULT NULL,
  `reasoning` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usulan_packages`
--

CREATE TABLE `usulan_packages` (
  `id` int(7) NOT NULL,
  `nomor` varchar(100) DEFAULT NULL,
  `user_id` int(7) DEFAULT NULL,
  `jenis_id` int(7) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asb`
--
ALTER TABLE `asb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_bipeknonstandart`
--
ALTER TABLE `asb_bipeknonstandart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_bipeknonstandart_review`
--
ALTER TABLE `asb_bipeknonstandart_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_bipekstandart`
--
ALTER TABLE `asb_bipekstandart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_bipekstandart_review`
--
ALTER TABLE `asb_bipekstandart_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_bpsgallery`
--
ALTER TABLE `asb_bpsgallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_detail`
--
ALTER TABLE `asb_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_detail_review`
--
ALTER TABLE `asb_detail_review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_document`
--
ALTER TABLE `asb_document`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_fungsiruang`
--
ALTER TABLE `asb_fungsiruang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_jakon`
--
ALTER TABLE `asb_jakon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_jenis`
--
ALTER TABLE `asb_jenis`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_klasifikasi`
--
ALTER TABLE `asb_klasifikasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_kompbangpros`
--
ALTER TABLE `asb_kompbangpros`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_komponenbangunan`
--
ALTER TABLE `asb_komponenbangunan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_komponennonstd`
--
ALTER TABLE `asb_komponennonstd`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_lantai`
--
ALTER TABLE `asb_lantai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_log`
--
ALTER TABLE `asb_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_shst`
--
ALTER TABLE `asb_shst`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_status`
--
ALTER TABLE `asb_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asb_tipebangunan`
--
ALTER TABLE `asb_tipebangunan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dph`
--
ALTER TABLE `dph`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `jenis`
--
ALTER TABLE `jenis`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `kabkota`
--
ALTER TABLE `kabkota`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kamus`
--
ALTER TABLE `kamus`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `rekening`
--
ALTER TABLE `rekening`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `satuan`
--
ALTER TABLE `satuan`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `sptjm`
--
ALTER TABLE `sptjm`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `usulan`
--
ALTER TABLE `usulan`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `usulan_packages`
--
ALTER TABLE `usulan_packages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asb`
--
ALTER TABLE `asb`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_bipeknonstandart`
--
ALTER TABLE `asb_bipeknonstandart`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_bipeknonstandart_review`
--
ALTER TABLE `asb_bipeknonstandart_review`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_bipekstandart`
--
ALTER TABLE `asb_bipekstandart`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_bipekstandart_review`
--
ALTER TABLE `asb_bipekstandart_review`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_bpsgallery`
--
ALTER TABLE `asb_bpsgallery`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_detail`
--
ALTER TABLE `asb_detail`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_detail_review`
--
ALTER TABLE `asb_detail_review`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_document`
--
ALTER TABLE `asb_document`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_fungsiruang`
--
ALTER TABLE `asb_fungsiruang`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_jakon`
--
ALTER TABLE `asb_jakon`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_jenis`
--
ALTER TABLE `asb_jenis`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_klasifikasi`
--
ALTER TABLE `asb_klasifikasi`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_kompbangpros`
--
ALTER TABLE `asb_kompbangpros`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_komponenbangunan`
--
ALTER TABLE `asb_komponenbangunan`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_komponennonstd`
--
ALTER TABLE `asb_komponennonstd`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_lantai`
--
ALTER TABLE `asb_lantai`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_log`
--
ALTER TABLE `asb_log`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_shst`
--
ALTER TABLE `asb_shst`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_status`
--
ALTER TABLE `asb_status`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asb_tipebangunan`
--
ALTER TABLE `asb_tipebangunan`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dph`
--
ALTER TABLE `dph`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kabkota`
--
ALTER TABLE `kabkota`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kamus`
--
ALTER TABLE `kamus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rekening`
--
ALTER TABLE `rekening`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `satuan`
--
ALTER TABLE `satuan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sptjm`
--
ALTER TABLE `sptjm`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usulan`
--
ALTER TABLE `usulan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usulan_packages`
--
ALTER TABLE `usulan_packages`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
