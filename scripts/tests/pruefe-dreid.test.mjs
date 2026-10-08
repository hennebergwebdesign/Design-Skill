/*
  pruefe-dreid.test.mjs — prüft die 3D-Regeln aus Kapitel 38, Abschnitt 5a, in pruefe-motion.mjs.

      node --test 'scripts/tests/*.test.mjs'

  Je Regel ein Fall, der sie verletzt, und einer, der ähnlich aussieht und durchgehen muss.
*/

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { dreiDAnalysieren } from '../pruefe-motion.mjs';

const regeln = (inhalt) => dreiDAnalysieren(inhalt).map((b) => b.regel);

test('dynamisch geladene Szene mit reduzierter Bewegung besteht', () => {
  const js = `const ruhig = matchMedia('(prefers-reduced-motion: reduce)').matches;\nconst THREE = await import('three');`;
  assert.deepEqual(regeln(js), []);
});

test('Szene ohne prefers-reduced-motion ist ein Fehler', () => {
  const b = dreiDAnalysieren(`const THREE = await import('three');\nnew THREE.WebGLRenderer();`);
  assert.equal(b.find((x) => x.regel === '3d-ohne-reduzierung').schwere, 'fehler');
});

test('statischer Import von three ist eine Warnung', () => {
  const js = `import * as THREE from 'three';\nimport { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';\nmatchMedia('(prefers-reduced-motion: reduce)');`;
  const b = dreiDAnalysieren(js);
  assert.deepEqual(b.map((x) => x.regel), ['3d-statischer-import']);
  assert.equal(b[0].schwere, 'warnung');
});

test('ohne three kein Befund, auch bei ähnlichen Namen', () => {
  assert.deepEqual(regeln(`import gsap from 'gsap';\nconst drei = 'three';`), []);
  assert.deepEqual(regeln(`// import * as THREE from 'three';`), []);
});
