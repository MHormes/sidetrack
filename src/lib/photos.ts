export type Photo = {
  id: number;
  src: string;
  span: string;
};

export const photos: Photo[] = [
  { id: 0, src: "/images/gallery/photo-00.jpg", span: "col-span-2 row-span-2" },
  { id: 1, src: "/images/gallery/photo-02.jpg", span: "row-span-2" },
  { id: 2, src: "/images/gallery/photo-05.jpg", span: "" },
  { id: 3, src: "/images/gallery/photo-03.jpg", span: "" },
  { id: 4, src: "/images/gallery/photo-09.jpg", span: "" },
  { id: 5, src: "/images/gallery/photo-06.jpg", span: "row-span-2" },
  { id: 6, src: "/images/gallery/photo-01.jpg", span: "col-span-2" },
  { id: 7, src: "/images/gallery/photo-04.jpg", span: "col-span-2" },
  { id: 8, src: "/images/gallery/photo-07.jpg", span: "" },
  { id: 9, src: "/images/gallery/photo-11.jpg", span: "col-span-2 row-span-2" },
  { id: 10, src: "/images/gallery/photo-08.jpg", span: "" },
];
