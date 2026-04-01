/**
 * =====================================
 * CITTO CLINIC - Animações e UI
 * Usa GSAP e ScrollTrigger para performance otimizada
 * =====================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Verifica preferência do usuário de redução de movimento (Acessibilidade)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Desativa ou simplifica todas as animações
        console.log('[Accessibility] prefers-reduced-motion ativado. Animações reduzidas.');
        gsap.ticker.fps(1); // Desativa efetivamente o loop do GSAP intensamente.
        return; 
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. ANIMAÇÕES DE REVELAÇÃO (Scroll Reveal)
    // Reveal suave para textos e subtítulos (Ajustado para não mexer na opacidade agressivamente antes do CSS dinâmico carregar)
    gsap.utils.toArray('h1, h2, h3, p').forEach(elemento => {
        // Apenas adiciona um leve deslize se preferir, mas sem usar opacity 0 estático no from()
        // para evitar blocos em branco se a CDN do Tailwind atrasar.
        gsap.from(elemento, 
            {
                y: 20, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: elemento,
                    start: "top 95%", 
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Removendo a animação que escondia (".card-specialty") para resolver o bug do bloco em branco.

    // 2. EFEITOS DE GLOW ORB
    // Adiciona uma esfera de brilho sutil (Glassmorphism + Glow) rodando no fundo da section de contato
    const contatoSection = document.getElementById('contato');
    if (contatoSection) {
        const orb = document.createElement('div');
        orb.className = 'glow-orb';
        contatoSection.style.position = 'relative';
        contatoSection.style.overflow = 'hidden';
        // Inserir antes do primeiro filho
        contatoSection.insertBefore(orb, contatoSection.firstChild);

        gsap.to(orb, {
            x: '100vw',
            y: '50vh',
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});
