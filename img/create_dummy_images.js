const fs = require('fs');
const { createCanvas } = require('canvas');

// Fungsi untuk membuat gambar
function createImage(width, height, color, text, filename) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Isi latar belakang
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    
    // Tambahkan teks
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Ukuran font
    const fontSize = Math.min(width, height) / 10;
    ctx.font = `bold ${fontSize}px Arial`;
    
    // Tambahkan teks
    ctx.fillText(text, width / 2, height / 2);
    
    // Tambahkan ukuran
    ctx.font = `${fontSize / 2}px Arial`;
    ctx.fillText(`${width} x ${height}`, width / 2, height / 2 + fontSize);
    
    // Simpan gambar
    const buffer = canvas.toBuffer('image/jpeg');
    fs.writeFileSync(filename, buffer);
    
    console.log(`Created ${filename}`);
}

// Buat gambar-gambar
createImage(500, 500, '#6c63ff', 'Profile Photo', 'profile.png');
createImage(800, 600, '#4db6ac', 'About Photo', 'about.jpg');
createImage(350, 250, '#f50057', 'Project 1', 'portfolio-1.jpg');
createImage(350, 250, '#ff9800', 'Project 2', 'portfolio-2.jpg');
createImage(350, 250, '#9c27b0', 'Project 3', 'portfolio-3.jpg');
createImage(350, 250, '#009688', 'Project 4', 'portfolio-4.jpg');
createImage(350, 250, '#3f51b5', 'Project 5', 'portfolio-5.jpg');
createImage(350, 250, '#607d8b', 'Project 6', 'portfolio-6.jpg');
createImage(800, 400, '#6c63ff', 'Portfolio Preview', 'preview.jpg'); 