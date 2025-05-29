'use client';

import { QRCodeSVG } from 'qrcode.react';

export default function QRCodeGenerator({ restaurantId }: { restaurantId: string }) {
  const menuUrl = `${window.location.origin}/menu/${restaurantId}`;

  const downloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `menufy-qr-${restaurantId}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="bg-white p-4 rounded-lg">
        <QRCodeSVG
          id="qr-code"
          value={menuUrl}
          size={200}
          level="H"
          includeMargin={true}
        />
      </div>
      <button
        onClick={downloadQR}
        className="px-4 py-2 bg-kerala-orange text-white rounded-md hover:bg-opacity-90"
      >
        Download QR Code
      </button>
    </div>
  );
}