/* ==========================================================================
   SISTEMA WEBGL 3D PARTICOLARE RICCO ED ETHEREAL BOKEH BLOOM
   ========================================================================== */

let setShape = () => {};
let setScene = () => {};
let glFrame = () => {};
let triggerPulse = () => {};
let glReady = false;

if (typeof THREE !== 'undefined') {
    (() => {
        const COUNT = innerWidth < 768 ? 22000 : 48000;
        let seed = 1234;

        const R = () => {
            seed |= 0;
            seed = seed + 0x6D2B79F5 | 0;
            let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
            t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };

        const G = () => (R() + R() + R() + R() - 2) / 2;

        /* ================= FORME PARTICELLE VOLUMETRICHE RICCHE ================= */
        const SH = [];
        const make = fn => {
            const a = new Float32Array(COUNT * 3);
            for (let i = 0; i < COUNT; i++) {
                const v = fn(i);
                a[i * 3] = v[0];
                a[i * 3 + 1] = v[1];
                a[i * 3 + 2] = v[2];
            }
            SH.push(a);
        };

        /* 0 Galassia Spaziale */
        make(i => {
            const r = Math.pow(R(), .65) * 12.0, a = r * .5 + (i % 3) * 2.094 + G() * .4;
            return [Math.cos(a) * r, Math.sin(a) * r * .85, G() * 1.5 * (1 - r / 12) - 2.5];
        });

        /* 1 Sfera Bokeh */
        make(i => {
            const y = 1 - 2 * (i + .5) / COUNT, rad = Math.sqrt(1 - y * y), th = i * 2.39996, r = 6.2 + G() * .5;
            return [Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r - 2.5];
        });

        /* 2 Reticolo Cubico Volumetrico */
        make(() => {
            const ax = Math.floor(R() * 3), L = 8, u = -6.0 + 12 * Math.floor(R() * L) / (L - 1), v = -6.0 + 12 * Math.floor(R() * L) / (L - 1), c = -6.0 + 12 * R();
            const p = ax === 0 ? [c, u, v] : ax === 1 ? [u, c, v] : [u, v, c];
            return [p[0] + G() * .35, p[1] + G() * .35, p[2] + G() * .35 - 2.5];
        });

        /* 3 Schede 3D */
        make(i => {
            const k = i % 5;
            let x, y;
            if (R() < .35) {
                const t = R(), sd = Math.floor(R() * 4);
                x = sd < 2 ? -4.5 + 9.0 * t : (sd === 2 ? -4.5 : 4.5);
                y = sd < 2 ? (sd ? 5.6 : -5.6) : -5.6 + 11.2 * t;
            } else {
                x = (R() * 2 - 1) * 4.5;
                y = (R() * 2 - 1) * 5.6;
            }
            const z = (k - 2) * 2.1 + G() * .25 - 2.5, c = Math.cos(.35), s = Math.sin(.35);
            return [x * c + z * s, y + (k - 2) * .35, -x * s + z * c];
        });

        /* 4 Rete Neurale Volumetrica */
        const C = Array.from({ length: 18 }, () => {
            const u = R() * 2 - 1, t = R() * 6.283, r = Math.cbrt(R()) * 6.5, q = Math.sqrt(1 - u * u);
            return [r * q * Math.cos(t), r * u, r * q * Math.sin(t)];
        });
        const E = [];
        for (let i = 0; i < 18; i++) {
            E.push([i, (i + 1) % 18], [i, (i + 5) % 18]);
        }
        make(i => {
            if (R() < .3) {
                const e = E[Math.floor(R() * E.length)], t = R(), a = C[e[0]], b = C[e[1]];
                return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t - 2.5];
            }
            const c = C[i % 18];
            return [c[0] + G() * .85, c[1] + G() * .85, c[2] + G() * .85 - 2.5];
        });

        /* 5 Toroidale Olografico */
        make(() => {
            const t = R() * 6.2832, r = Math.cos(3 * t) + 2, s = 2.5;
            return [r * Math.cos(2 * t) * s + G() * .35, r * Math.sin(2 * t) * s + G() * .35, -Math.sin(3 * t) * s * 1.4 + G() * .35 - 2.5];
        });

        /* 6 Doppia Elica Dati */
        make(i => {
            if (R() < .12) {
                const y = (R() * 2 - 1) * 8.5, a = y * .9, t = R();
                return [Math.cos(a) * 3.2 * (1 - 2 * t), y, Math.sin(a) * 3.2 * (1 - 2 * t) - 2.5];
            }
            const y = (R() * 2 - 1) * 8.5, a = y * .9 + (i % 2) * Math.PI;
            return [Math.cos(a) * 3.2 + G() * .25, y, Math.sin(a) * 3.2 + G() * .25 - 2.5];
        });

        /* 7 Onda Fluida bilanciata per la massima leggibilita */
        make(() => {
            const x = (R() * 2 - 1) * 12.0, z = (R() * 2 - 1) * 12.0;
            return [x, Math.sin(x * .55) * Math.cos(z * .55) * 1.6 - 2.4 + G() * .5, z + G() * .5 - 3.0];
        });

        const canvasEl = document.getElementById('gl');
        if (!canvasEl) return;

        const quick = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const initialPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(initialPixelRatio);
        renderer.setSize(innerWidth, innerHeight, false);
        renderer.setClearColor(0x000000, 0);

        renderer.domElement.addEventListener('webglcontextlost', e => e.preventDefault(), false);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, .1, 100);
        camera.position.z = 14;

        const group = new THREE.Group();
        scene.add(group);

        const rand = new Float32Array(COUNT).map(() => Math.random());
        const colorHue = new Float32Array(COUNT).map(() => Math.random());

        const aFrom = new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3);
        const aTo = new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3);
        for (let i = 0; i < COUNT * 3; i++) {
            aFrom.array[i] = aTo.array[i] = (Math.random() - .5) * 50;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
        geo.setAttribute('aFrom', aFrom);
        geo.setAttribute('aTo', aTo);
        geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
        geo.setAttribute('aHue', new THREE.BufferAttribute(colorHue, 1));

        let clickPulseVal = 0;
        window.triggerPulse = triggerPulse = () => {
            clickPulseVal = 1.0;
        };

        const U = {
            uTime: { value: 0 },
            uMix: { value: 1 },
            uPixel: { value: initialPixelRatio },
            uMouseNDC: { value: new THREE.Vector2(99, 99) },
            uMouseOn: { value: 0 },
            uAspect: { value: innerWidth / innerHeight },
            uAmp: { value: quick ? .25 : 1 },
            uColA: { value: new THREE.Color('#00ffcc') },
            uColB: { value: new THREE.Color('#9d00ff') },
            uColC: { value: new THREE.Color('#ff0088') },
            uPulse: { value: 0 }
        };

        const mat = new THREE.ShaderMaterial({
            uniforms: U,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: `
            attribute vec3 aFrom; attribute vec3 aTo; attribute float aRand; attribute float aHue;
            uniform float uTime,uMix,uPixel,uMouseOn,uAmp,uPulse,uAspect; uniform vec2 uMouseNDC;
            varying float vK; varying float vA; varying float vHue;
            vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
            vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
            vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
            vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
            float snoise(vec3 v){
              const vec2 C=vec2(1./6.,1./3.); const vec4 D=vec4(0.,.5,1.,2.);
              vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
              vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
              vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
              i=mod289(i);
              vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
              float n_=.142857142857; vec3 ns=n_*D.wyz-D.xzx;
              vec4 j=p-49.*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.*x_);
              vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.-abs(x)-abs(y);
              vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
              vec4 s0=floor(b0)*2.+1.; vec4 s1=floor(b1)*2.+1.; vec4 sh=-step(h,vec4(0.));
              vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
              vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
              vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
              p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
              vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.); m=m*m;
              return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
            }
            void main(){
              float d=aRand*.45; float m=clamp((uMix-d)/.55,0.,1.); m=m*m*(3.-2.*m);
              vec3 p=mix(aFrom,aTo,m);

              // Fluid Turbulance Noise
              vec3 q=p*.25+vec3(0.,uTime*.15,0.);
              vec3 n=vec3(snoise(q),snoise(q+vec3(31.4,7.1,13.7)),snoise(q+vec3(63.2,15.3,27.9)));
              p+=n*(.22+sin(m*3.14159)*2.2)*uAmp;

              // Proiezione NDC per repulsione MOUSE
              vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
              vec4 clipPos = projectionMatrix * mvPosition;
              vec2 screenPos = clipPos.xy / clipPos.w;

              vec2 dmScreen = (screenPos - uMouseNDC);
              dmScreen.x *= uAspect;
              float distScreen = length(dmScreen);

              float f = smoothstep(0.45, 0.0, distScreen) * uMouseOn;
              float pulsef = smoothstep(0.6, 0.0, abs(distScreen - (1.0 - uPulse) * 0.9)) * uPulse * 1.8;

              vec2 pushDir = normalize(dmScreen + vec2(1e-4));
              p.xy += pushDir * (f * 1.6 + pulsef);
              p.z += (f * 1.4 + pulsef) * sin(uTime * 3.0 + aRand * 6.28);

              mvPosition = modelViewMatrix * vec4(p, 1.0);
              gl_Position = projectionMatrix * mvPosition;

              // Twinkle shimmer brillante
              float twinkle = sin(uTime * 2.5 + aRand * 6.28) * 0.35 + 0.65;

              // Size attenuation calibrata
              gl_PointSize = (2.2 + aRand * 4.5) * uPixel * (11.0 / -mvPosition.z) * (1.0 + (f + pulsef) * 0.9) * twinkle;

              vK = clamp(aRand * .7 + n.x * .5 + .15, 0., 1.);
              vHue = aHue;
              vA = (.55 + .45 * aRand) * clamp(1.0 - (-mvPosition.z - 8.0) / 24.0, .25, .9) * twinkle;
            }`,
            fragmentShader: `
            uniform vec3 uColA,uColB,uColC; varying float vK; varying float vA; varying float vHue;
            void main(){
              vec2 c = gl_PointCoord - vec2(0.5);
              float r = length(c);
              if (r > 0.5) discard;

              // Multi-layered Bokeh Glow Shader
              float core = smoothstep(0.5, 0.0, r);
              float glow = pow(max(core, 0.0), 1.5);
              float bloom = pow(max(core, 0.0), 3.0);

              vec3 baseCol = mix(uColA, uColB, vK);
              vec3 iridCol = mix(baseCol, uColC, vHue);
              vec3 col = iridCol + vec3(1.0) * bloom * 0.55 + vec3(0.8, 1.0, 0.9) * glow * 0.3;

              gl_FragColor = vec4(col, core * vA * 0.85);
            }`
        });

        const pts = new THREE.Points(geo, mat);
        pts.frustumCulled = false;
        group.add(pts);

        /* Polvere di sfondo */
        const dg = new THREE.BufferGeometry();
        const dp = new Float32Array(1600 * 3);
        for (let i = 0; i < dp.length; i++) dp[i] = (Math.random() - .5) * 60;
        dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
        const dust = new THREE.Points(dg, new THREE.PointsMaterial({
            size: .08, color: 0x88ffdd, transparent: true, opacity: .4, depthWrite: false, blending: THREE.AdditiveBlending
        }));
        scene.add(dust);

        /* Transizioni tra forme */
        let curShape = -1, mixV = 1;
        const mo = { v: 1 };

        window.setShape = setShape = k => {
            if (!glReady || typeof k !== 'number' || isNaN(k) || k < 0 || k >= SH.length || k === curShape) return;
            const f = aFrom.array, t = aTo.array;
            if (mixV < 1) {
                for (let i = 0; i < COUNT; i++) {
                    let m = Math.max(0, Math.min(1, (mixV - rand[i] * .45) / .55));
                    m = m * m * (3 - 2 * m);
                    for (let c = 0; c < 3; c++) {
                        f[i * 3 + c] += (t[i * 3 + c] - f[i * 3 + c]) * m;
                    }
                }
            } else {
                f.set(t);
            }
            t.set(SH[k]);
            aFrom.needsUpdate = aTo.needsUpdate = true;

            curShape = k;
            mixV = 0;
            mo.v = 0;
            U.uMix.value = 0;

            if (typeof gsap !== 'undefined') {
                gsap.to(mo, {
                    v: 1,
                    duration: quick ? .4 : 2.2,
                    ease: 'power2.inOut',
                    overwrite: true,
                    onUpdate() {
                        mixV = mo.v;
                        U.uMix.value = mo.v;
                    }
                });
            } else {
                mixV = 1;
                U.uMix.value = 1;
            }
        };

        const colA = U.uColA.value, colB = U.uColB.value, colC = U.uColC.value;
        const tA = new THREE.Color('#00ffcc'), tB = new THREE.Color('#9d00ff'), tC = new THREE.Color('#ff0088');
        let offT = 0;

        window.setScene = setScene = (ca, cb, x) => {
            if (ca) tA.set(ca);
            if (cb) tB.set(cb);
            offT = innerWidth < 992 ? 0 : (x || 0);
        };

        window.glFrame = glFrame = (time, ss, sm, isModalOpen, menuOpen) => {
            U.uTime.value = time;
            U.uMouseOn.value += (((!isModalOpen && !menuOpen) ? 1 : 0) - U.uMouseOn.value) * .1;

            U.uMouseNDC.value.set(sm.rawX, -sm.rawY);
            U.uAspect.value = innerWidth / innerHeight;

            if (clickPulseVal > 0.001) {
                clickPulseVal -= 0.025;
                if (clickPulseVal < 0) clickPulseVal = 0;
            }
            U.uPulse.value = clickPulseVal;

            colA.lerp(tA, .05);
            colB.lerp(tB, .05);
            colC.lerp(tC, .05);

            group.position.x += (offT - group.position.x) * .04;

            group.rotation.y = Math.sin(time * 0.12) * 0.22 + sm.x * 0.12;
            group.rotation.x = Math.cos(time * 0.10) * 0.12 + sm.y * 0.08;
            dust.rotation.y = time * .01;
            group.updateMatrixWorld(true);

            renderer.render(scene, camera);
        };

        addEventListener('resize', () => {
            const pr = Math.min(window.devicePixelRatio || 1, 2);
            renderer.setPixelRatio(pr);
            renderer.setSize(innerWidth, innerHeight, false);
            camera.aspect = innerWidth / innerHeight;
            camera.updateProjectionMatrix();
            U.uPixel.value = pr;
            U.uAspect.value = innerWidth / innerHeight;
        });

        window.setGLReady = (val) => { glReady = val; };
    })();
}
