import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>

        <div className={styles.location}>
          <h3>Italy Tasty</h3>
          <p>📍 Av. Corrientes 1234, Buenos Aires, Argentina</p>
          <p>📞 +54 11 4567-8900</p>
        </div>

        <div className={styles.social}>
          <h4>Seguinos</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/tasteofitalypizzeria/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

      </div>

      <p className={styles.copy}>© {new Date().getFullYear()} Italy Tasty — Todos los derechos reservados.</p>
    </footer>
  );
}
