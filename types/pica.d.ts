declare module 'pica' {
  class Pica {
    resize(from: HTMLCanvasElement, to: HTMLCanvasElement): Promise<HTMLCanvasElement>;
  }
  export = Pica;
}
