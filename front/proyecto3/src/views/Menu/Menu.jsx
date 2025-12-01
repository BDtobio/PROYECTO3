import styles from "./Menu.module.css";

export default function Menu() {
  return (
    <section id="menu" className={styles.menuSection}>

<div className={styles.heroText}>
  <h2 className={styles.menuTitle}>MENÚ</h2>
  <h1 className={styles.brandTitle}>ITALY TASTY</h1>
</div>


      {/* HERO */}
      <div
        className={styles.menuHero}
        style={{ backgroundImage: "url(/images/menu.png)" }}
      >
        
      </div>

    </section>
  );
}
