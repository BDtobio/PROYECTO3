import styles from "./Home.module.css";

import plato1 from "/images/plato1.png";
import plato2 from "/images/plato2.png";
import plato3 from "/images/plato3.png";
import plato4 from "/images/plato4.png";


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
                Creada en honor a la Reina Margherita, representa los colores
                de la bandera italiana: tomate, mozzarella y albahaca.
              </p>
            </div>
          </div>

          {/* Plato 3 */}
          <div className={`${styles.plato} ${styles.reverse}`}>
            <div className={styles.textContainer}>
              <h3>Risotto alla Milanese</h3>
              <p>
                Este plato cremoso originado en Milán utiliza azafrán para su
                distintivo color dorado.
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
                Capas de bizcochos en café, mascarpone y cacao. Un clásico
                dulce del Véneto.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
