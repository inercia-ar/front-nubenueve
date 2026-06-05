<script setup>
import { useStore } from '../recursos/store.js' 

const store = useStore()
</script>

<template>
  <section class="tienda-wrapper">
    <header class="header-doc">
      <div class="nav-izq">
        <router-link :to="{ name: 'home' }" class="nav-link">◄ REBOBINAR</router-link>
        <span class="mono separator">||</span>
        <span class="mono title">ARCHIVO MASTER</span>
      </div>
      <div class="nav-der mono">
        CAPACIDAD: {{ store.mock.length }} UNIDADES
      </div>
    </header>

    <div class="grilla-epa">
      <article 
        v-for="(item, index) in store.mock" 
        :key="item.id" 
        class="item-folleto" 
        :class="`color-${index % 4}`"
      >
        <div class="tape-header">
          <div class="franja-color"></div>
          <span class="codigo">IDX-00{{ item.id }}</span>
        </div>

        <div class="info-superior">
          <div class="etiqueta-vacia">
            <h3>{{ item.name }}</h3>
          </div>
          <div class="tech-specs mono">
            <span>STOCK: {{ item.stock }}</span>
            <span>FORMATO: ANALOG</span>
          </div>
        </div>
        
        <div class="bloque-inferior">
          <div class="price-box">
            <span class="mono">TARIFA</span>
            <p class="precio">${{ item.price }}</p>
          </div>
          <button class="btn-block">AÑADIR [ + ]</button>
        </div>
      </article>
      
      <article class="item-folleto placeholder">
        <div class="tape-header"><div class="franja-color"></div><span class="codigo">VACÍO</span></div>
        <div class="info-superior"><div class="etiqueta-vacia"><h3>NO DATA</h3></div></div>
        <div class="bloque-inferior vacio"></div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tienda-wrapper {
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
}

.header-doc {
  display: flex;
  justify-content: space-between;
  /* CHANGED: 4px to 1px */
  border-bottom: 1px solid var(--brillo);
  padding-bottom: 1rem;
  margin-bottom: 3rem;
  background-color: transparent;
  color: var(--brillo);
}

.nav-izq { display: flex; align-items: center; gap: 1rem; }
.mono { font-family: var(--font-mono); font-size: 0.85rem; letter-spacing: 0.1em; }
.nav-link { color: var(--arcilla); text-decoration: none; transition: color 0.2s; }
.nav-link:hover { color: var(--lirio); }

.grilla-epa {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem; 
}

.color-0 { --tema-foco: var(--lirio); }   
.color-1 { --tema-foco: var(--cristal); } 
.color-2 { --tema-foco: var(--arcilla); } 
.color-3 { --tema-foco: var(--poma); }    

.item-folleto {
  background-color: var(--carbon);
  display: flex;
  flex-direction: column;
  /* CHANGED: Removed brutalist 6px hard shadow and 4px borders */
  border: 1px solid var(--humo);
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.item-folleto:hover {
  transform: translateY(-4px);
  /* Added a soft, premium optical drop shadow */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border-color: var(--tema-foco);
}

.tape-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--humo);
  background-color: var(--carbon);
}

.franja-color {
  width: 30px;
  height: 20px;
  background-color: var(--tema-foco);
}

.codigo {
  color: var(--polvo);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  padding-right: 1rem;
}

.info-superior {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.etiqueta-vacia {
  background-color: var(--brillo);
  border: 1px solid var(--humo);
  padding: 1.5rem 1rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  background-image: repeating-linear-gradient(transparent, transparent 28px, var(--humo25) 28px, var(--humo25) 29px); /* Thinner lines */
}

h3 {
  font-family: var(--font-grotesk);
  font-size: 1.8rem;
  color: var(--carbon);
  margin: 0;
  line-height: 1;
  letter-spacing: -0.02em;
}

.tech-specs {
  display: flex;
  justify-content: space-between;
  color: var(--brillo);
  border-top: 1px dashed var(--humo50);
  padding-top: 0.8rem;
}

.bloque-inferior {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--humo);
}

.price-box {
  padding: 1rem;
  background-color: transparent;
  color: var(--brillo);
  display: flex;
  flex-direction: column;
}

.precio {
  font-family: var(--font-grotesk);
  font-size: 1.5rem;
  margin: 0;
}

.btn-block {
  background-color: transparent;
  color: var(--brillo);
  border: none;
  border-left: 1px solid var(--humo);
  font-family: var(--font-mono);
  font-size: 1rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
}

.item-folleto:hover .btn-block {
  background-color: var(--tema-foco);
  color: var(--carbon);
  border-color: var(--tema-foco);
}

.placeholder { opacity: 0.4; filter: grayscale(1); --tema-foco: var(--humo); }
.placeholder:hover { transform: none; box-shadow: none; border-color: var(--humo); }
</style>