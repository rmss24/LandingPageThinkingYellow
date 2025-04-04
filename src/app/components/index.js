// pages/index.js
import { ModalButton } from '../components/Modal';

export default function Home() {
  // Definisci i dati per diversi modali
  const modals = [
    {
      buttonText: "Apri Info Prodotto",
      title: "Informazioni Prodotto",
      content: "Questo è un prodotto fantastico che risolverà tutti i tuoi problemi!",
      link: "https://esempio.com/prodotto1",
      linkText: "Vedi dettagli prodotto"
    },
    {
      buttonText: "Contattaci",
      title: "Informazioni di Contatto",
      content: "Puoi contattarci via email o telefono per qualsiasi domanda.",
      link: "https://esempio.com/contatti",
      linkText: "Vai alla pagina contatti"
    },
    {
      buttonText: "Termini e Condizioni",
      title: "Termini e Condizioni",
      content: "Leggi i nostri termini e condizioni per l'utilizzo del servizio.",
      link: "https://esempio.com/termini",
      linkText: "Leggi i termini completi"
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Esempio Modali</h1>
      
      <div className="flex flex-wrap gap-4">
        {modals.map((modal, index) => (
          <ModalButton
            key={index}
            buttonText={modal.buttonText}
            modalTitle={modal.title}
            modalContent={modal.content}
            modalLink={modal.link}
            modalLinkText={modal.linkText}
          />
        ))}
      </div>
    </div>
  );
}