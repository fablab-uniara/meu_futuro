import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCw, ChevronRight, Compass, QrCode } from 'lucide-react';
import { toJpeg } from 'html-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import { removeBackground } from '@imgly/background-removal';

// ==========================================
// 1. IMPORTAÇÃO DOS CENÁRIOS
// ==========================================
import fundoLideranca from './assets/fundo-lideranca.png';
import fundoEstrategia from './assets/fundo-estrategia.png';
import fundoInovacao from './assets/fundo-inovacao.png';
import fundoComunicacao from './assets/fundo-comunicacao.png';
import fundoNegociacao from './assets/fundo-negociacao.png';
import fundoEmpreendedorismo from './assets/fundo-empreendedorismo.png';
import fundoPlanejamento from './assets/fundo-planejamento.png';
import fundoCriatividade from './assets/fundo-criatividade.png';
import fundoEtica from './assets/fundo-etica.png';
import fundoSustentabilidade from './assets/fundo-sustentabilidade.png';
import fundoVisao from './assets/fundo-visao.png';
import fundoTecnologia from './assets/fundo-tecnologia.png';

// ==========================================
// 2. IMPORTAÇÃO DOS TOKENS (BOTÕES)
// ==========================================
import tokenLideranca from './assets/tokens/lideranca.png';
import tokenEstrategia from './assets/tokens/estrategia.png';
import tokenInovacao from './assets/tokens/inovacao.png';
import tokenComunicacao from './assets/tokens/comunicacao.png';
import tokenNegociacao from './assets/tokens/negociacao.png';
import tokenEmpreendedorismo from './assets/tokens/empreendedorismo.png';
import tokenPlanejamento from './assets/tokens/planejamento.png';
import tokenCriatividade from './assets/tokens/criatividade.png';
import tokenEtica from './assets/tokens/etica.png';
import tokenSustentabilidade from './assets/tokens/sustentabilidade.png';
import tokenVisao from './assets/tokens/visao.png';
import tokenTecnologia from './assets/tokens/tecnologia.png';

// ==========================================
// 3. MAPEAMENTO E DICIONÁRIO
// ==========================================
// ==========================================
// 3. MAPEAMENTO E DICIONÁRIO
// ==========================================
// ==========================================
// 3. MAPEAMENTO E DICIONÁRIO
// ==========================================
const imageMap = {
  lideranca: { fundo: fundoLideranca, token: tokenLideranca },
  estrategia: { fundo: fundoEstrategia, token: tokenEstrategia },
  inovacao: { fundo: fundoInovacao, token: tokenInovacao },
  comunicacao: { fundo: fundoComunicacao, token: tokenComunicacao },
  negociacao: { fundo: fundoNegociacao, token: tokenNegociacao },
  empreendedorismo: { fundo: fundoEmpreendedorismo, token: tokenEmpreendedorismo },
  planejamento: { fundo: fundoPlanejamento, token: tokenPlanejamento },
  criatividade: { fundo: fundoCriatividade, token: tokenCriatividade }, // <-- Troca de Análise para Criatividade
  etica: { fundo: fundoEtica, token: tokenEtica },
  sustentabilidade: { fundo: fundoSustentabilidade, token: tokenSustentabilidade },
  visao: { fundo: fundoVisao, token: tokenVisao },
  tecnologia: { fundo: fundoTecnologia, token: tokenTecnologia }
};

const powerData = {
  lideranca: { title: "LIDERANÇA", quote: "Liderar é transformar intenção em direção e pessoas em resultados." },
  estrategia: { title: "ESTRATÉGIA", quote: "Estratégia é transformar análise em plano e risco em oportunidade." },
  inovacao: { title: "INOVAÇÃO", quote: "Inovar é ver o que todos veem e criar o que ninguém imaginou." },
  comunicacao: { title: "COMUNICAÇÃO", quote: "Comunicar é a arte de transformar grandes ideias em ações concretas." },
  negociacao: { title: "NEGOCIAÇÃO", quote: "Negociar é construir pontes e acordos onde todos prosperam." },
  empreendedorismo: { title: "EMPREENDEDORISMO", quote: "Empreender é transformar a coragem de começar em soluções de valor." },
  planejamento: { title: "PLANEJAMENTO", quote: "Planejar é trazer o futuro para o presente para poder agir agora." },
  criatividade: { title: "CRIATIVIDADE", quote: "A criatividade é a inteligência se divertindo enquanto constrói o novo." }, // <-- Frase nova para Criatividade
  etica: { title: "ÉTICA", quote: "A ética é a bússola inegociável que constrói um legado de impacto." },
  sustentabilidade: { title: "SUSTENTABILIDADE", quote: "Sustentabilidade é garantir o progresso de hoje sem comprometer o amanhã." },
  visao: { title: "VISÃO", quote: "Ter visão é enxergar o destino da jornada antes mesmo de dar o primeiro passo." },
  tecnologia: { title: "TECNOLOGIA", quote: "A tecnologia é a alavanca que multiplica o potencial do negócio e das pessoas." }
};// ==========================================
export default function App() {
  const [step, setStep] = useState('welcome');
  const [image, setImage] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  
  const webcamRef = useRef(null);
  const cardRef = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token') || 'lideranca';
  
  const currentPower = powerData[token.toLowerCase()] || powerData['lideranca'];
  const currentImages = imageMap[token.toLowerCase()] || imageMap['lideranca'];
  const goldColor = "#C8A153";

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setStep('confirm');
  };

const generateFuture = async () => {
    setStep('processing');
    try {
      // 1. Pega a foto tirada e cria uma imagem virtual
      const img = new Image();
      img.src = image;
      
      // 2. Espera a imagem carregar
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // 3. Usa um Canvas para converter a imagem base64 em um formato (Blob) que a IA entende
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      const blobImage = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));

      // 4. MÁGICA: A Inteligência Artificial local entra em ação! 
      // O primeiro clique pode demorar alguns segundos, mas os próximos são a jato.
      const config = {
        publicPath: "https://static.imgly.com/@imgly/background-removal-data/1.3.0/dist/"
      };
      
      const blobTransparente = await removeBackground(blobImage, config);
      
      // 5. Prepara a imagem recortada para a tela
      const safeLocalUrl = URL.createObjectURL(blobTransparente);
      setResultUrl(safeLocalUrl); 
      setStep('result');
      
    } catch (error) {
      console.error('Erro na Inteligência Artificial Local:', error);
      alert('Tivemos um problema ao recortar a foto. O rostinho não foi detectado direito, tente novamente!');
      setStep('confirm'); 
    }
  };

  const handleGenerateQR = async () => {
    setIsSharing(true);
    try {
      const dataUrl = await toJpeg(cardRef.current, {
        quality: 0.95,
        pixelRatio: 2, 
        backgroundColor: '#000000'
      });

      const base64Data = dataUrl.split(',')[1];
      const formData = new FormData();
      formData.append('image', base64Data);

      // ==========================================
      // COLOQUE A SUA CHAVE DO IMGBB AQUI!
      // ==========================================
      const apiKey = 'e4371030bf028ed7f9322e7c6fce4a99'; 
      
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      if (data.success) {
        setQrCodeUrl(data.data.url);
      } else {
        throw new Error('Falha no upload da imagem');
      }

    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      alert('Houve um pequeno erro de conexão. Tente novamente.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-4">
      
    {step === 'welcome' && (
        <div className="text-center w-full max-w-5xl px-4 sm:px-8 py-8 animate-in fade-in duration-500 flex flex-col items-center justify-center flex-grow">
          <h2 style={{ color: goldColor }} className="font-bold tracking-widest text-sm sm:text-lg mb-10 uppercase">
            Toque no seu token para iniciar
          </h2>
          
          {/* Grid responsivo: 2 colunas em telas pequenas, 3 em tablets, 4 em telas grandes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 w-full mb-8">
            {Object.keys(powerData).map((key) => (
              <button 
                key={key}
                onClick={() => {
                  window.history.pushState({}, '', `?token=${key}`);
                  setStep('camera');
                }}
                className="flex flex-col items-center group transition-transform hover:scale-105 active:scale-95 w-full"
              >
                {/* O botão agora é w-full (largura total) e aspect-square (mantém círculo) */}
                <div className="w-full aspect-square rounded-full bg-white border-2 border-gray-200 flex items-center justify-center mb-4 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:border-[#C8A153] group-hover:shadow-[0_0_20px_rgba(200,161,83,0.4)] transition-all duration-300">
                <img 
  src={imageMap[key].token} 
  alt={powerData[key].title} 
  className="w-[100%] h-[100%] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
/>
                </div>
                <span className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-bold group-hover:text-white transition-colors">
                  {powerData[key].title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'camera' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in duration-500">
          <h2 style={{ color: goldColor }} className="font-bold tracking-widest text-xs mb-2 uppercase">VOCÊ ESCOLHEU</h2>
          <h1 className="text-2xl font-black mb-6 uppercase text-center">{currentPower.title}</h1>
          
          <div className="rounded-xl overflow-hidden mb-6 border border-gray-800 w-full aspect-[3/4] bg-gray-900 flex items-center justify-center relative">
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" videoConstraints={{ facingMode: "user" }} className="absolute min-w-full min-h-full object-cover" />
          </div>

          <button onClick={capture} className="bg-white text-black w-full py-4 font-bold flex items-center justify-center gap-2">
            <Camera size={20}/> TIRAR FOTO
          </button>
        </div>
      )}

      {step === 'confirm' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
          <h1 className="text-xl font-black mb-6 text-center">FOTO CAPTURADA</h1>
          <div className="rounded-xl overflow-hidden mb-6 border border-gray-800 w-full">
            <img src={image} alt="Selfie" className="w-full h-auto" />
          </div>
          <button onClick={generateFuture} style={{ backgroundColor: goldColor }} className="text-black w-full py-4 font-bold mb-3">
            USAR ESTA FOTO
          </button>
          <button onClick={() => setStep('camera')} className="text-gray-400 font-bold py-4 flex items-center justify-center gap-2 w-full">
            <RefreshCw size={16}/> TIRAR NOVAMENTE
          </button>
        </div>
      )}

      {step === 'processing' && (
        <div className="text-center animate-pulse flex flex-col items-center">
          <RefreshCw size={40} style={{ color: goldColor }} className="mb-6 animate-spin" />
          <h1 className="text-2xl font-black mb-4">SEU FUTURO ESTÁ SENDO CONSTRUÍDO...</h1>
          <p className="text-gray-400 font-mono text-sm">Projetando possibilidades...</p>
        </div>
      )}

      {step === 'result' && (
        <div className="w-full max-w-sm flex flex-col items-center animate-in slide-in-from-bottom-4 duration-700">
          
          <div 
            id="card-resultado" 
            ref={cardRef}
            style={{ position: 'relative', width: '100%', maxWidth: '420px', aspectRatio: '9/16', margin: '0 auto', overflow: 'hidden', backgroundColor: '#000' }}
          >
            {/* O Fundo Dinâmico */}
            <img 
              src={currentImages.fundo} 
              alt={`Cenário ${currentPower.title}`} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
            />

            {/* A Foto do Aluno */}
            <div style={{ position: 'absolute', bottom: '45%', left: 0, right: 0, height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', zIndex: 10 }}>
              <img 
                src={resultUrl} 
                alt="Aluno 2032"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>

            {/* Textos e Logo */}
            <div className="absolute top-8 w-full flex flex-col items-center px-8" style={{ zIndex: 20 }}>
              <div className="flex items-center justify-center gap-4 w-full">
                <div className="h-[1px] flex-grow opacity-60" style={{ backgroundColor: goldColor }}></div>
                <h2 className="text-4xl font-light tracking-[0.25em] text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>2032</h2>
                <div className="h-[1px] flex-grow opacity-60" style={{ backgroundColor: goldColor }}></div>
              </div>
              <p style={{ color: goldColor, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }} className="tracking-widest text-[10px] mt-2 uppercase font-medium">
                Uma possibilidade do seu futuro
              </p>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 35%, rgba(0,0,0,0) 100%)', zIndex: 15 }}></div>

            <div className="absolute bottom-6 w-full flex flex-col items-center text-center px-6" style={{ zIndex: 20 }}>
              <p className="text-white tracking-[0.2em] text-xs mb-2 uppercase font-light">Você escolheu</p>
              <h1 
  style={{ 
    color: goldColor, 
    fontFamily: 'Georgia, "Times New Roman", serif', 
    textShadow: '0 4px 12px rgba(0,0,0,0.8)' 
  }} 
  className={`leading-none font-bold mb-5 tracking-wide uppercase ${
    currentPower.title.length >= 14 ? 'text-[1.6rem]' : 
    currentPower.title.length >= 10 ? 'text-[2.4rem]' : 
    'text-[3.25rem]'
  }`}
>
  {currentPower.title}.
</h1>
              <Compass size={20} style={{ color: goldColor }} className="mb-5 opacity-80" strokeWidth={1.5} />
              <p className="text-gray-200 text-xs mb-10 px-4 leading-relaxed font-light">{currentPower.quote}</p>
              
              <div className="flex items-center justify-center w-full gap-5 mb-8">
                <span className="text-white text-sm font-light">Curso de Administração</span>
                <div className="w-[1px] h-8 bg-white opacity-40"></div>
                <div className="flex flex-col text-left">
                  <span className="text-white font-black text-2xl leading-none tracking-tighter">UNIARA</span>
                  <span className="text-white text-[5px] tracking-[0.2em] mt-1 opacity-90">UNIVERSIDADE DE ARARAQUARA</span>
                </div>
              </div>

              <div className="border-t border-b py-2 w-[85%]" style={{ borderColor: 'rgba(200, 161, 83, 0.3)' }}>
                <p style={{ color: goldColor }} className="tracking-[0.2em] text-[9px] font-medium uppercase">Meu futuro começa aqui.</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 flex flex-col gap-3">
            <button 
              onClick={handleGenerateQR} 
              disabled={isSharing}
              style={{ backgroundColor: goldColor }}
              className="text-black w-full py-4 font-black flex items-center justify-center gap-2 rounded shadow-lg uppercase tracking-wider"
            >
              {isSharing ? <RefreshCw size={20} className="animate-spin" /> : <><QrCode size={20} /> Baixar no Celular</>}
            </button>

            <button 
              onClick={() => { window.history.pushState({}, '', window.location.pathname); window.location.reload(); }} 
              className="text-gray-400 text-sm font-bold py-3 flex items-center justify-center gap-2 w-full hover:text-white transition-colors uppercase tracking-widest"
            >
              <RefreshCw size={14}/> Voltar aos Tokens
            </button>
          </div>

          {qrCodeUrl && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}>
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Escaneie para Salvar</h2>
              <p className="text-gray-400 text-sm mb-8 px-4">Aponte a câmera do seu celular para fazer o download da imagem e postar nos stories com <strong className="text-white">#MeuFuturoComeçaAqui</strong></p>
              <div className="bg-white p-4 rounded-xl shadow-[0_0_40px_rgba(200,161,83,0.3)] mb-8">
                <QRCodeCanvas value={qrCodeUrl} size={220} level={"H"} />
              </div>
              <button onClick={() => setQrCodeUrl(null)} className="text-gray-400 font-bold py-3 px-8 border border-gray-700 rounded hover:text-white hover:border-white transition-colors">FECHAR E VOLTAR</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}