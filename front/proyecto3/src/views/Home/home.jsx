import styles from "./Home.module.css";

import plato1 from "/images/plato1.png";
import plato2 from "/images/plato2.png";
import plato3 from "/images/plato3.png";
import plato4 from "/images/plato4.png";

import image1 from "/images/image1.png";
import image2 from "/images/image2.png";

const Home = () => {
  return (
    <div className="page">
      <div className={styles.container}>

        {/* HERO */}
        <section className={styles.hero}>
          <div className="video-container">
            <video className="full-screen-video" autoPlay loop muted>
              <source src="/videos/video1.mp4" type="video/mp4" />
            </video>
          </div>

          <div className={styles.heroText}>
            <h1>ITALY TASTY</h1>
            <p>Donde la tradición italiana cobra vida en cada plato</p>

            <a href="/reservaciones" className={styles.reservaBtn}>
              RESERVA YA
            </a>
          </div>
        </section>

        {/* PLATOS FAMOSOS */}
        <section className={styles.platosFamosos}>
          <h2 className={styles.sectionTitle}>Nuestros Platos Más Famosos</h2>

          {/* Plato 1 */}
          <div className={`${styles.plato} ${styles.reverse}`}>
            <div className={styles.textContainer}>
              <h3>Spaghetti Carbonara</h3>
              <p>
                Este plato clásico nació en Roma y combina pasta al dente con
                una mezcla cremosa de yema de huevo, queso pecorino y panceta.
              </p>
            </div>
            <img src={plato1} alt="Spaghetti Carbonara" className={styles.image} />
          </div>

          {/* Plato 2 */}
          <div className={styles.plato}>
            <img src={plato2} alt="Pizza Margherita" className={styles.image} />
            <div className={styles.textContainer}>
              <h3>Pizza Margherita</h3>
              <p>
                Representa los colores de la bandera italiana: tomate, mozzarella y albahaca.
              </p>
            </div>
          </div>

          {/* Plato 3 */}
          <div className={`${styles.plato} ${styles.reverse}`}>
            <div className={styles.textContainer}>
              <h3>Risotto alla Milanese</h3>
              <p>
                Un risotto cremoso originado en Milán, famoso por su distintivo color dorado.
              </p>
            </div>
            <img src={plato3} alt="Risotto alla Milanese" className={styles.image} />
          </div>

          {/* Plato 4 */}
          <div className={styles.plato}>
            <img src={plato4} alt="Tiramisú" className={styles.image} />
            <div className={styles.textContainer}>
              <h3>Tiramisú</h3>
              <p>
                Capas de bizcochos mojados en café, mascarpone y cacao. Un clásico italiano.
              </p>
            </div>
          </div>
        </section>

        {/* NUESTRA HISTORIA - UNIFICADA */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutTitle}>Nuestra Historia</h2>

          <div className={styles.aboutContent}>
            <p className={styles.aboutText}>
              Bienvenidos a <strong>ITALY TASTY</strong>, un restaurante que combina
              la tradición y el sabor auténtico de Italia con un ambiente cálido y
              moderno. Desde nuestra apertura en 1995, hemos buscado compartir la
              esencia de la cocina italiana en cada plato.
              <br /><br />
              Ubicados en el corazón de Buenos Aires, ofrecemos una experiencia
              culinaria que celebra la cultura y la pasión italiana, con recetas
              tradicionales y un toque contemporáneo.
            </p>

            <div className={styles.aboutImages}>
              <img src={image1} alt="Interior del restaurante" />
              <img src={image2} alt="Plato italiano" />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
