/**
 * =====================================
 * CITTO CLINIC - Analytics & Tracking
 * =====================================
 * Este script gerencia a captura de UTMs, persistência via SessionStorage,
 * disparo de eventos para GA4 e Meta Pixel, além de anexar os UTMs
 * dinamicamente nos links de conversão (WhatsApp).
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. CAPTURA E ARMAZENAMENTO DE UTMs
    const urlParams = new URLSearchParams(window.location.search);
    const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    // Salva os que estiverem na URL atual na sessão
    utmFields.forEach(param => {
        if (urlParams.has(param)) {
            sessionStorage.setItem(param, urlParams.get(param));
        }
    });

    // 2. INJEÇÃO DE UTMS NOS LINKS DE SAÍDA (WHATSAPP)
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    function buildUtmString() {
        let utmString = '';
        utmFields.forEach(param => {
            const value = sessionStorage.getItem(param);
            if (value) {
                // Junta com ' - ' ou outro delimitador à string.
                // Como enviaremos pelo whatsapp texto, vamos anexar no final.
                utmString += `\n[${param}: ${value}]`;
            }
        });
        return utmString;
    }

    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Adiciona tracking de Clique (Standard Event do Meta: Lead)
            trackConversion('Lead', { method: 'WhatsApp' });
            
            const originalUrl = link.getAttribute('href');
            const utmPayload = buildUtmString();
            if (utmPayload) {
                // Modifica a URL para injetar os UTMS na mensagem se possível, 
                // ou apenas mantem. Neste caso, adiar o redirecionamento ou usar URL parsing.
                // Como texto já está codificado, decodifica, anexa utms, e recodifica.
                try {
                    const url = new URL(originalUrl);
                    let text = url.searchParams.get('text') || '';
                    text += utmPayload;
                    url.searchParams.set('text', text);
                    link.setAttribute('href', url.toString());
                } catch(e) { }
            }
        });
    });

    // Tracking de navegação para seções
    const sectionLinks = document.querySelectorAll('nav a');
    sectionLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Standard Event: ViewContent
            trackConversion('ViewContent', { content_name: link.textContent });
        });
    });
});

/**
 * Função unificada para disparar Eventos de Conversão (Server/Client)
 * Dispara simultaneamente no Google Analytics (GTAG) e Facebook Pixel (fbq)
 */
function trackConversion(eventName, params = {}) {
    // Console log de debug local
    console.log(`[Tracking] Disparando evento: ${eventName}`, params);

    // Google Analytics 4
    if (typeof gtag === 'function') {
        gtag('event', eventName, params);
    }

    // Meta Pixel
    if (typeof fbq === 'function') {
        // Se for ViewContent ou Lead, é evento padrão
        const standardEvents = ['ViewContent', 'Search', 'AddToCart', 'AddToWishlist', 'InitiateCheckout', 'AddPaymentInfo', 'Purchase', 'Lead', 'CompleteRegistration'];
        
        if (standardEvents.includes(eventName)) {
            fbq('track', eventName, params);
        } else {
            fbq('trackCustom', eventName, params);
        }
    }
}
