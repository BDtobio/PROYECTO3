
import styles from "./AcercaDe.module.css"
import image1 from '/images/image1.png';
import image2 from '/images/image2.png';
const AcercaDe = () => {
    return (
      <div className={styles.allAcercaDe}>
        
      
    <div className={styles.container}>
      
      <section className={styles.aboutSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Nuestra Historia</h1>
          <p className={styles.description}>
            Bienvenidos a *ITALY TASTY*, un restaurante italiano que combina
            la tradición y el sabor auténtico de Italia con un ambiente único y
            acogedor. Desde nuestra fundación en 1995, hemos buscado compartir
            la esencia de la cocina italiana en cada plato. Ubicados en el
            corazón de Buenos Aires, ofrecemos una experiencia culinaria que
            celebra la cultura y la pasión italiana.
          </p>
        </div>
        <div className={styles.imageContainer}>
       
          <img
            src={image1}
            alt="Interior del restaurante"
            className={styles.image}
          />
          <img
            src={image2}
            alt="Plato italiano"
            className={styles.image}
          />
        </div>
      </section>

    
    </div>
    </div>
  );
  };
  
  export default AcercaDe;