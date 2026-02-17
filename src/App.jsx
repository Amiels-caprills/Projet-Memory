import React, { useState, useEffect } from 'react';

const VALEURS = ['A', 'B', 'C', 'D', 'E', 'F'];


const genererCartes = () => {
    return [...VALEURS, ...VALEURS]
        .sort(() => Math.random() - 0.5)
        .map((lettre, index) => ({
            id: index,
            valeur: lettre,
            estRetournee: false,
            estTrouvee: false
        }));
};

const MemoryGame = () => {
    const [cartes, setCartes] = useState(genererCartes());
    const [choix, setChoix] = useState([]); // Stocke les index des 2 cartes choisies
    const [verrouillage, setVerrouillage] = useState(false); // Empêche le clic pendant l'animation


    useEffect(() => {
        if (choix.length === 2) {
            setVerrouillage(true);
            const [index1, index2] = choix;

            if (cartes[index1].valeur === cartes[index2].valeur) {

                setCartes(prev => prev.map((c, i) =>
                    (i === index1 || i === index2) ? { ...c, estTrouvee: true } : c
                ));
                reinitialiserTour();
            } else {

                setTimeout(() => {
                    setCartes(prev => prev.map((c, i) =>
                        (i === index1 || i === index2) ? { ...c, estRetournee: false } : c
                    ));
                    reinitialiserTour();
                }, 1000);
            }
        }
    }, [choix]);

    const reinitialiserTour = () => {
        setChoix([]);
        setVerrouillage(false);
    };

    const gererClic = (index) => {
        if (verrouillage || cartes[index].estRetournee || cartes[index].estTrouvee) return;


        setCartes(prev => prev.map((c, i) => i === index ? { ...c, estRetournee: true } : c));


        setChoix(prev => [...prev, index]);
    };

    return (
        <div style={styles.container}>
            <h2>Memory Game</h2>
            <div style={styles.grid}>
                {cartes.map((carte, index) => (
                    <div
                        key={carte.id}
                        onClick={() => gererClic(index)}
                        style={{
                            ...styles.card,
                            backgroundColor: carte.estTrouvee ? '#90ee90' : (carte.estRetournee ? '#fff' : '#2c3e50'),
                            color: (carte.estRetournee || carte.estTrouvee) ? '#333' : 'transparent'
                        }}
                    >
                        {carte.valeur}
                    </div>
                ))}
            </div>
            <button onClick={() => setCartes(genererCartes())} style={styles.btn}>Rejouer</button>
        </div>
    );
};


const styles = {
    container: { textAlign: 'center', padding: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 80px)', gap: '10px', justifyContent: 'center' },
    card: {
        width: '80px', height: '80px', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '24px', fontWeight: 'bold', cursor: 'pointer',
        border: '2px solid #34495e', transition: '0.3s'
    },
    btn: { marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }
};

export default MemoryGame;