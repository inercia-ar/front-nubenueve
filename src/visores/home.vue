<script setup>
</script>

<template>
  <section class="hero-brutal">
    <header class="header-doc">
      <div class="brand-block">
        <span class="mono accent-bg">TYPE IV</span>
        <span class="mono hide-mobile">METAL POSITION</span>
      </div>
      <div class="dolby-fake hide-mobile">
        <span class="mono">COMPATIBLE</span>
        <strong>[ NR ]</strong>
      </div>
      <router-link :to="{ name: 'tienda' }" class="nav-link">[ SISTEMA ON ]</router-link>
    </header>
    
    <div class="titular">
      <div class="color-bars">
        <div class="bar bar-lirio"></div>
        <div class="bar bar-arcilla"></div>
        <div class="bar bar-cristal"></div>
      </div>
      <h1>Sistemas<br>de Sonido<br>Avanzados.</h1>
      <h2 class="sub-mono">SERIE-808 // ALTA FIDELIDAD // STEREO</h2>
    </div>

    <div class="pie-doc">
      <div class="info-technica">
        <div class="barcode"></div>
        <div class="specs">
          <p class="mono">FREQ: 20Hz - 20kHz</p>
          <p class="mono">BIAS: NORMAL / CrO2</p>
        </div>
      </div>
      <router-link :to="{ name: 'tienda' }" class="cta-brutal">EXPLORAR ARCHIVO ▼</router-link>
    </div>
  </section>
</template>

<style scoped>
.hero-brutal {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(2rem, 5vh, 4rem) clamp(2rem, 6vw, 5rem);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  
  /* CHANGED: 1px grid lines for a technical cutting-mat feel */
  background-image: 
    linear-gradient(var(--carbon25) 1px, transparent 1px),
    linear-gradient(90deg, var(--carbon25) 1px, transparent 1px);
  background-size: 30px 30px; 
}

.header-doc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* CHANGED: 4px border to 1px */
  border-bottom: 1px solid var(--brillo);
  padding-bottom: 1rem;
  flex-shrink: 0;
}

.brand-block, .dolby-fake {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mono {
  font-family: var(--font-mono);
  color: var(--brillo);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 500;
}

.accent-bg {
  background-color: var(--brillo);
  color: var(--carbon);
  padding: 0.1rem 0.6rem;
  font-weight: bold;
}

.nav-link {
  font-family: var(--font-mono);
  color: var(--cristal);
  font-size: 0.9rem;
  text-decoration: none;
  letter-spacing: 0.15em;
}

.nav-link:hover { color: var(--lirio); }

.titular {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
}

.color-bars {
  display: flex;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
}

/* CHANGED: Bars made smaller to match the tape index aesthetic */
.bar { width: 24px; height: 6px; }
.bar-lirio { background-color: var(--lirio); }
.bar-arcilla { background-color: var(--arcilla); }
.bar-cristal { background-color: var(--cristal); }

h1 {
  font-family: var(--font-grotesk);
  font-size: clamp(3rem, 8vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: var(--brillo);
  margin: 0;
  font-weight: 500;
}

.sub-mono {
  font-family: var(--font-mono);
  color: var(--humo);
  font-size: clamp(0.85rem, 1vw, 1.2rem);
  margin-top: 1rem;
  letter-spacing: 0.25em;
}

.pie-doc {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* CHANGED: 4px border to 1px */
  border-top: 1px solid var(--brillo);
  padding-top: clamp(1rem, 3vh, 2rem);
  gap: 2rem;
  flex-shrink: 0;
}

.info-technica {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.barcode {
  width: 80px;
  height: 30px;
  background: repeating-linear-gradient(
    90deg,
    var(--brillo),
    var(--brillo) 1px,
    transparent 1px,
    transparent 3px,
    var(--brillo) 3px,
    var(--brillo) 5px,
    transparent 5px,
    transparent 8px
  );
}

.specs p {
  margin: 0;
  color: var(--polvo);
  font-size: 0.85rem;
}

.cta-brutal {
  padding: 0.8rem 2rem;
  background-color: transparent;
  color: var(--lirio);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-decoration: none;
  /* CHANGED: 4px border to 1px outline */
  border: 1px solid var(--lirio);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.cta-brutal:hover {
  background-color: var(--lirio);
  color: var(--carbon);
  box-shadow: 0 0 15px var(--lirio50); /* Premium optical glow */
}

@media (max-width: 768px) {
  .pie-doc { flex-direction: column; align-items: flex-start; }
  .hide-mobile { display: none; }
}
</style>