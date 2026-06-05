<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section class="not-found">
    <div class="warning-tape top"></div>
    
    <div class="error-console">
      <header class="console-header mono">SYS.ERR // CODE 404</header>
      <div class="console-body">
        <h1>SEÑAL<br>PERDIDA</h1>
        <p class="mono">> LA CINTA SE HA CORTADO.</p>
        <p class="mono">> POSIBLE FIN DEL CARRETE.</p>
        
        <button @click="router.push({ name: 'home' })" class="btn-volver">
          [ EJECUTAR REBOBINADO AUTOMÁTICO ]
        </button>
      </div>
    </div>

    <div class="warning-tape bottom"></div>
  </section>
</template>

<style scoped>
.not-found {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--niebla);
  position: relative;
}

.warning-tape {
  height: 20px; /* Thinner */
  width: 100%;
  background: repeating-linear-gradient(
    -45deg,
    var(--arcilla),
    var(--arcilla) 10px,
    var(--carbon) 10px,
    var(--carbon) 20px
  );
  border-bottom: 1px solid var(--brillo);
}
.warning-tape.bottom { border-bottom: none; border-top: 1px solid var(--brillo); }

.error-console {
  margin: 0 auto;
  width: 90%;
  max-width: 600px;
  /* CHANGED: 4px border and 15px shadow to 1px glowing wireframe */
  border: 1px solid var(--lirio);
  background-color: var(--carbon);
  box-shadow: 0 0 40px rgba(255, 51, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.console-header {
  background-color: var(--lirio);
  color: var(--carbon);
  padding: 0.5rem 1rem;
  letter-spacing: 0.1em;
}

.console-body {
  padding: 4rem; /* More breathing room */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-family: var(--font-grotesk);
  font-size: 5rem;
  line-height: 0.9;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--brillo);
  /* CHANGED: Massive solid glitch to a hyper-realistic optical aberration */
  text-shadow: -1px 0px 0px var(--lirio), 1px 0px 0px var(--cristal);
}

.mono {
  font-family: var(--font-mono);
  color: var(--humo);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  margin: 0;
}

.btn-volver {
  margin-top: 3rem;
  padding: 1rem;
  background-color: transparent;
  color: var(--cristal);
  border: 1px solid var(--cristal);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-volver:hover {
  background-color: var(--cristal);
  color: var(--carbon);
  box-shadow: 0 0 15px rgba(0, 85, 255, 0.3);
}
</style>