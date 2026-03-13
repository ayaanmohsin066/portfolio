import { classes } from '~/utils/style';
import styles from './footer.module.css';

export const Footer = ({ className }) => (
  <footer className={classes(styles.footer, className)}>
    <p className={styles.copyright}>
      © 2026 Ayaan Mohsin. All rights reserved.
    </p>
  </footer>
);
