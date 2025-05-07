import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor() { }

    getSliderBackground(currentTime: number, duration: number): string {
        const percentage = (currentTime / duration) * 100 || 0;
        return `linear-gradient(to right, #FFFFFF 0%, #FFFFFF ${percentage}%, #ccc ${percentage}%, #ccc 100%)`;
    }

    getDominantColorsFromImage(imgUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imgUrl;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject('No se pudo crear el contexto 2D');
                    return;
                }

                const width = (canvas.width = img.width);
                const height = (canvas.height = img.height);

                ctx.drawImage(img, 0, 0, width, height);
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;

                const colorMap = new Map<string, number>();

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const key = `${r},${g},${b}`;
                    colorMap.set(key, (colorMap.get(key) || 0) + 1);
                }

                const sortedColors = Array.from(colorMap.entries())
                    .sort((a, b) => b[1] - a[1])
                    .map(([key]) => key);

                const [c1, c2] = sortedColors;

                const gradient = `linear-gradient(to top , rgb(${c1}), rgb(${c2}))`;
                resolve(gradient);
            };

            img.onerror = () => reject('Error cargando la imagen');
        });
    }
}