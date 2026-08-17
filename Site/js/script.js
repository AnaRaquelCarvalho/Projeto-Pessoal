document.addEventListener('DOMContentLoaded', () => {
    
    // Terminal com suas frases
    const terminal = document.getElementById("terminal");
    const frases = [
        "> Interface tátil sincronizada.",
        "> Todos os elementos 3D ativos.",
        "> Badge de status unificada com navegação."
    ];
    
    let line = 0;
    let char = 0;

    function type() {
        if (line < frases.length) {
            if (char < frases[line].length) {
                terminal.innerHTML += frases[line].charAt(char);
                char++;
                setTimeout(type, 30);
            } else {
                terminal.innerHTML += "<br>";
                line++;
                char = 0;
                setTimeout(type, 600);
            }
        }
    }

    // Movimento 3D nos Cards e Nome
    function apply3DEffect(elements, intensity = 12) {
        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Atualiza spotlight se for card
                if (element.classList.contains('bento-card')) {
                    element.style.setProperty('--x', `${x}px`);
                    element.style.setProperty('--y', `${y}px`);
                }
                
                const rotateX = (y - rect.height/2) / -intensity;
                const rotateY = (x - rect.width/2) / intensity;
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    }

    apply3DEffect(document.querySelectorAll('.bento-card'), 20);
    apply3DEffect(document.querySelectorAll('#hero-name'), 12);

    type();
});