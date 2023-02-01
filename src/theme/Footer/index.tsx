import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import styles from "./index.module.scss";
import LinkItem from "./LinkItem";

export default function Footer(props) {
  const { footer } = useThemeConfig();

  if (!footer) {
    return null;
  }
  const {copyright, links, logo} = footer;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {logo && (
          <div className={styles.logoRow}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        )}
        <div className={styles.footerRow}>
          {copyright && <div className={styles.copyRight}>{copyright}</div>}
          <div className={styles.links}>
            {links.map((item) => (
              <LinkItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
