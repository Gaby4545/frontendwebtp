import Jumbotron from 'react-bootstrap/Jumbotron';
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
    return (
      <div>
        <Jumbotron>
          <h2>Accueil</h2>
        </Jumbotron>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://pixabay.com/get/53e7d5474d5bad14eadb807ece2e3177083ed8e55659754d762d79.jpg"
              alt="Premiere image"
            />
            <Carousel.Caption>
              <h3>Premiere image</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://pixabay.com/get/53e3dc404c5aa914eadb807ece2e3177083ed8e55659754d76287b.jpg"
              alt="Deuxieme image"
            />
  
            <Carousel.Caption>
              <h3>Deuxieme image</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://pixabay.com/get/53e7d0434252a814eadb807ece2e3177083ed8e55659754d712b7c.jpg"
              alt="Troisieme image"
            />
  
            <Carousel.Caption>
              <h3>Troisieme image</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }