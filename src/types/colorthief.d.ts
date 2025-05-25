declare module "colorthief" {
  export default class ColorThief {
    getColor(image: HTMLImageElement | HTMLCanvasElement): number[];
    getPalette(
      image: HTMLImageElement | HTMLCanvasElement,
      colorCount?: number
    ): number[][];
  }
}
