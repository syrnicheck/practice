export interface IPhoto {
  id: number,
  width: number,
  height: number,
  url: string,
  photographer: string,
  photographer_url: string,
  photographer_id: number,
  avg_color: string,
  src: {
    original: string,
    large: string,
    medium: string,
    small: string,
    large2x: string,
    portrait: string,
    landscape: string,
    tiny: string
  },
  liked: boolean,
  alt: string
}


