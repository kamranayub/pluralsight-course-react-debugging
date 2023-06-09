import { Box, Carousel, Image } from "grommet";

export default function ProductImageCarousel({ images }) {
  return (
    <Box height="small" width="medium" overflow="hidden">
      <Carousel fill>
        {images.map((image) => (
          <Image key={image} fit="cover" src={image} />
        ))}
      </Carousel>
    </Box>
  );
}
