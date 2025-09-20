document.addEventListener('DOMContentLoaded', () => {
  console.log("JavaScript loaded");

  const hamburger = document.querySelector('.hamburger');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinksMobile = document.querySelector('.nav-links-mobile'); // Pilih nav-links-mobile
  const dropdownMobiles = document.querySelectorAll('.dropdown-mobile'); // Pilih dropdown-mobile

  if (!hamburger || !navOverlay || !navLinksMobile) {
    console.error('One or more essential navigation elements not found in the DOM.');
    return;
  }

  // Event listener untuk hamburger icon
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navOverlay.classList.toggle('active');
    // Matikan scroll body saat overlay aktif
    document.body.style.overflow = navOverlay.classList.contains('active') ? 'hidden' : 'auto';
    console.log('Nav Overlay toggled, active:', navOverlay.classList.contains('active'));
  });

  // Event listener untuk menutup overlay saat mengklik tautan navigasi utama di mobile
  navLinksMobile.querySelectorAll('li a:not(.dropbtn-mobile)').forEach(link => {
    link.addEventListener('click', () => {
      // Hanya tutup overlay jika hamburger aktif (menunjukkan tampilan mobile)
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Kembalikan scroll body
        console.log('Nav link clicked, closing overlay');
      }
    });
  });

  // Event listener untuk dropdown di mobile
  dropdownMobiles.forEach(dropdown => {
    const dropbtnMobile = dropdown.querySelector('.dropbtn-mobile');
    if (dropbtnMobile) {
      dropbtnMobile.addEventListener('click', (e) => {
        // Hanya aktifkan dropdown toggle di mobile (berdasarkan lebar layar)
        if (window.innerWidth <= 768) {
          e.preventDefault(); // Mencegah navigasi default ke collections.html
          dropdown.classList.toggle('active');
          console.log('Dropdown mobile clicked, active:', dropdown.classList.contains('active'));
        }
      });
    }

    // Event listener untuk tautan di dalam dropdown content mobile
    dropdown.querySelectorAll('.dropdown-content-mobile a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Pastikan overlay dan hamburger tertutup setelah mengklik tautan di dropdown
        if (hamburger.classList.contains('active')) { // Cek apakah sedang dalam mode mobile
          hamburger.classList.remove('active');
          navOverlay.classList.remove('active');
          document.body.style.overflow = 'auto'; // Kembalikan scroll body
          console.log('Dropdown content link clicked, closing overlay');
          // e.preventDefault() tidak diperlukan di sini karena kita ingin link bekerja
          // Setelah menutup overlay, biarkan browser menavigasi ke href
        }
      });
    });
  });

  // Menutup overlay jika ukuran layar berubah dari mobile ke desktop saat overlay terbuka
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navOverlay.classList.contains('active')) {
      hamburger.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      // Pastikan semua dropdown mobile juga tertutup
      dropdownMobiles.forEach(dropdown => {
        dropdown.classList.remove('active');
      });
      console.log('Window resized to desktop, closing overlay');
    }
  });
});