

import NavBar from "../../components/navbar/NavBar";
import styles from "./Home.module.css"
import image3 from '../../images/image3.png';
import plato1 from '../../images/plato1.png';
import plato2 from '../../images/plato2.png';
import plato3 from '../../images/plato3.png';
import plato4 from '../../images/plato4.png';


import { useState } from 'react';
import Register from "../Register/RegisterUser";

// import Register from "../Register/RegisterUser";
const Home= () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


    return (   
      <div>   
   
      
        <div>
        
        <NavBar />
     </div>
    <div className={styles.container}>

    <h1>Bienvenido a la Página Principal</h1>
    <button onClick={openModal}>Abrir Registro</button>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} 
          >
            <Register isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
      )}

      {/* Sección de portada */}
      <section className={styles.hero}>
        {/* Imagen de fondo, puedes agregar tu imagen en src */}
        <img
          src={image3}
          alt="Portada del restaurante"
          className={styles.heroImage}
        />
        <div className={styles.heroText}>
          <h1>ITALY TASTY</h1>
          <p>Donde la tradición italiana cobra vida en cada plato</p>
        </div>
      </section>
      
      {/* Sección de platos famosos */}
      <section className={styles.platosFamosos}>
      <h2 className={styles.sectionTitle}>Nuestros Platos Más Famosos</h2>

      {/* Plato 1 */}
      <div className={`${styles.plato} ${styles.reverse}`}>
        <div className={styles.textContainer}>
          <h3>Spaghetti Carbonara</h3>
          <p>
            Este plato clásico nació en la región de Roma y combina pasta
            al dente con una mezcla cremosa de yema de huevo, queso pecorino,
            panceta y pimienta negra. Su sabor auténtico es una oda a la
            simplicidad y el equilibrio perfecto.
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
            Creada en honor a la Reina Margherita, esta pizza simboliza los
            colores de la bandera italiana: rojo (tomate), blanco (mozzarella)
            y verde (albahaca). Una combinación simple pero deliciosa que
            representa el corazón de Nápoles.
          </p>
        </div>
      </div>

      {/* Plato 3 */}
      <div className={`${styles.plato} ${styles.reverse}`}>
        <div className={styles.textContainer}>
          <h3>Risotto alla Milanese</h3>
          <p>
            Este plato cremoso proviene de Milán y debe su vibrante color
            dorado al azafrán. Es una muestra de la riqueza culinaria del
            norte de Italia, ideal para los amantes de sabores elegantes y
            sofisticados.
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
            Este postre icónico combina capas de bizcochos empapados en café,
            queso mascarpone y cacao en polvo. Originado en el Véneto, es una
            dulce celebración del arte de vivir a la italiana.
          </p>
        </div>
      </div>
    </section>
    </div>
    </div>
    );
};
export default Home