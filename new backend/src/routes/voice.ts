import { Router } from 'express';

const router = Router();

// Language-specific responses
const responses: Record<string, Record<string, string>> = {
  en: {
    default: 'I can help you with government schemes, market prices, issue reporting, and village information. What would you like to know?',
    ration: 'Your ration card (ID: RJ-2024-45678) is ACTIVE. Next distribution: Block A, October 15th. Items: Rice 5kg, Wheat 5kg, Sugar 1kg.',
    market: 'Current wheat price at Nagpur Mandi: ₹2,275/quintal (↑2.3%). Rice: ₹3,150/quintal (↓1.5%). Best time to sell wheat is this week.',
    weather: 'Today: 32°C, Partly Cloudy. Heavy rainfall expected in 48 hours. Advisory: Secure stored grain and prepare drainage for fields.',
    scheme: 'PM Kisan: 14th installment due by Oct 20. Status: Bank details verified. MGNREGA: 45 days used out of 100. Ujjwala: LPG refill due next month.',
    crop: 'Crop Insurance (PMFBY): Policy active for Kharif 2024. Claim status: No pending claims. Premium paid: ₹2,400 for 2 hectares of wheat.',
    pan: 'To apply for PAN Card, visit the nearest CSC center at Block A. Required: Aadhaar, passport photo, address proof. Fee: ₹107. Processing: 15 days.',
    irrigation: 'Irrigation Subsidy: You are eligible for PMKSY micro-irrigation subsidy (90% for drip, 55% for sprinkler). Apply at Block Development Office.',
  },
  hi: {
    default: 'मैं सरकारी योजनाओं, बाज़ार भावों, शिकायत दर्ज करने और गाँव की जानकारी में आपकी मदद कर सकता हूँ। आप क्या जानना चाहेंगे?',
    ration: 'आपका राशन कार्ड (ID: RJ-2024-45678) सक्रिय है। अगली वितरण: ब्लॉक A, 15 अक्टूबर। सामग्री: चावल 5 किलो, गेहूं 5 किलो, चीनी 1 किलो।',
    market: 'नागपुर मंडी में गेहूं का वर्तमान भाव: ₹2,275/क्विंटल (↑2.3%)। चावल: ₹3,150/क्विंटल (↓1.5%)। गेहूं बेचने का सबसे अच्छा समय इसी सप्ताह है।',
    weather: 'आज: 32°C, आंशिक बादल। 48 घंटों में भारी बारिश की संभावना। सलाह: भंडारित अनाज सुरक्षित करें और खेतों में जल निकासी तैयार करें।',
    scheme: 'पीएम किसान: 14वीं किस्त 20 अक्टूबर तक आने वाली है। स्थिति: बैंक विवरण सत्यापित। मनरेगा: 100 में से 45 दिन उपयोग हो चुके हैं। उज्ज्वला: अगले महीने LPG रिफिल आना है।',
    crop: 'फसल बीमा (PMFBY): खरीफ 2024 के लिए पॉलिसी सक्रिय है। दावा स्थिति: कोई लंबित दावा नहीं। प्रीमियम भुगतान: 2 हेक्टेयर गेहूं के लिए ₹2,400।',
    pan: 'पैन कार्ड के लिए आवेदन करने के लिए ब्लॉक A में निकटतम CSC केंद्र पर जाएं। आवश्यक: आधार, पासपोर्ट फोटो, पता प्रमाण। शुल्क: ₹107। प्रसंस्करण: 15 दिन।',
    irrigation: 'सिंचाई सब्सिडी: आप PMKSY सूक्ष्म सिंचाई सब्सिडी के पात्र हैं (ड्रिप के लिए 90%, स्प्रिंकलर के लिए 55%)। ब्लॉक विकास कार्यालय में आवेदन करें।',
  },
  mr: {
    default: 'सरकारी योजना, बाजार भाव, तक्रार नोंदणी आणि गावाची माहिती - मी तुम्हाला मदत करू शकतो. काय जाणून घ्यायचं?',
    ration: 'तुमचं रेशन कार्ड (ID: RJ-2024-45678) सक्रिय आहे. पुढील वितरण: ब्लॉक A, 15 ऑक्टोबर. सामग्री: तांदूळ 5 किलो, गहू 5 किलो, साखर 1 किलो.',
    market: 'नागपूर मंडीत गव्हाचा भाव: ₹2,275/क्विंटल (↑2.3%). तांदूळ: ₹3,150/क्विंटल (↓1.5%). गहू विकण्यासाठी हाच आठवडा सर्वोत्तम.',
    weather: 'आज: 32°C, अंशतः ढगाळ. 48 तासांत मुसळधार पावसाची शक्यता. सल्ला: साठवलेलं धान्य सुरक्षित करा.',
    scheme: 'पीएम किसान: 14 वा हप्ता 20 ऑक्टोबरपर्यंत. मनरेगा: 100 पैकी 45 दिवस वापरले. उज्ज्वला: पुढच्या महिन्यात LPG रिफिल.',
    crop: 'पीक विमा (PMFBY): खरीप 2024 साठी पॉलिसी सक्रिय. दावा स्थिती: कोणताही प्रलंबित दावा नाही.',
    pan: 'पॅन कार्डसाठी ब्लॉक A मधील जवळच्या CSC केंद्रावर जा. शुल्क: ₹107.',
    irrigation: 'सिंचन अनुदान: तुम्ही PMKSY सूक्ष्म सिंचन अनुदानास पात्र आहात (ठिबक 90%, तुषार 55%).',
  },
  ta: {
    default: 'அரசு திட்டங்கள், சந்தை விலைகள், புகார் பதிவு, கிராம தகவல் — நான் உதவ முடியும். என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?',
    ration: 'உங்கள் ரேஷன் கார்டு (ID: RJ-2024-45678) செயலில் உள்ளது. அடுத்த விநியோகம்: ப்ளாக் A, அக்டோபர் 15. அரிசி 5 கிலோ, கோதுமை 5 கிலோ, சர்க்கரை 1 கிலோ.',
    market: 'நாக்பூர் மண்டியில் கோதுமை விலை: ₹2,275/குவிண்டால் (↑2.3%). அரிசி: ₹3,150/குவிண்டால் (↓1.5%).',
    weather: 'இன்று: 32°C, ஓரளவு மேகமூட்டம். 48 மணி நேரத்தில் கனமழை எதிர்பார்க்கப்படுகிறது.',
    scheme: 'PM கிசான்: 14வது தவணை அக்டோபர் 20க்குள். MGNREGA: 100ல் 45 நாட்கள் பயன்படுத்தப்பட்டன.',
    crop: 'பயிர் காப்பீடு (PMFBY): கரீஃப் 2024 பாலிசி செயலில் உள்ளது.',
    pan: 'பான் கார்டுக்கு ப்ளாக் A CSC மையத்தில் விண்ணப்பிக்கவும். கட்டணம்: ₹107.',
    irrigation: 'நீர்ப்பாசன மானியம்: PMKSY நுண்ணீர் பாசன மானியத்திற்கு தகுதி உண்டு.',
  },
  te: {
    default: 'ప్రభుత్వ పథకాలు, మార్కెట్ ధరలు, సమస్య రిపోర్ట్, గ్రామ సమాచారం — నేను సహాయం చేయగలను. ఏమి తెలుసుకోవాలనుకుంటున్నారు?',
    ration: 'మీ రేషన్ కార్డు (ID: RJ-2024-45678) యాక్టివ్‌గా ఉంది. తదుపరి పంపిణీ: బ్లాక్ A, అక్టోబర్ 15. బియ్యం 5 కిలో, గోధుమ 5 కిలో, చక్కెర 1 కిలో.',
    market: 'నాగ్‌పూర్ మండీలో గోధుమ ధర: ₹2,275/క్వింటాల్ (↑2.3%). బియ్యం: ₹3,150/క్వింటాల్ (↓1.5%).',
    weather: 'ఈరోజు: 32°C, పాక్షిక మేఘావృతం. 48 గంటల్లో భారీ వర్షం ఆశించబడుతోంది.',
    scheme: 'PM కిసాన్: 14వ వాయిదా అక్టోబర్ 20 లోపు. MGNREGA: 100లో 45 రోజులు వాడారు.',
    crop: 'పంట బీమా (PMFBY): ఖరీఫ్ 2024 పాలసీ యాక్టివ్‌గా ఉంది.',
    pan: 'పాన్ కార్డ్ కోసం బ్లాక్ A CSC సెంటర్‌లో దరఖాస్తు చేయండి. ఫీజు: ₹107.',
    irrigation: 'నీటిపారుదల సబ్సిడీ: మీరు PMKSY సూక్ష్మ నీటిపారుదల సబ్సిడీకి అర్హులు.',
  },
};

// POST /api/voice/process
router.post('/process', (req, res) => {
  const { text, language } = req.body;
  const input = (text || '').toLowerCase();
  const lang = language || 'en';
  const langResponses = responses[lang] || responses.en;

  let response = langResponses.default;

  if (input.includes('ration') || input.includes('राशन') || input.includes('रेशन') || input.includes('ரேஷன்') || input.includes('రేషన్')) {
    response = langResponses.ration;
  } else if (input.includes('market') || input.includes('mandi') || input.includes('मंडी') || input.includes('भाव') || input.includes('wheat') || input.includes('गेहूं') || input.includes('बाजार') || input.includes('मार्केट')) {
    response = langResponses.market;
  } else if (input.includes('weather') || input.includes('मौसम') || input.includes('हवामान') || input.includes('వాతావరణం') || input.includes('வானிலை')) {
    response = langResponses.weather;
  } else if (input.includes('scheme') || input.includes('yojana') || input.includes('योजना') || input.includes('kisan') || input.includes('किसान') || input.includes('திட்ட') || input.includes('పథక')) {
    response = langResponses.scheme;
  } else if (input.includes('crop') || input.includes('insurance') || input.includes('बीमा') || input.includes('फसल') || input.includes('पीक') || input.includes('विमा') || input.includes('பயிர்') || input.includes('పంట')) {
    response = langResponses.crop;
  } else if (input.includes('pan') || input.includes('aadhaar') || input.includes('आधार') || input.includes('पॅन') || input.includes('పాన్')) {
    response = langResponses.pan;
  } else if (input.includes('irrigation') || input.includes('सिंचाई') || input.includes('सिंचन') || input.includes('subsidy') || input.includes('सब्सिडी') || input.includes('అనుదान') || input.includes('நீர்')) {
    response = langResponses.irrigation;
  }

  res.json({
    success: true,
    data: {
      input: text,
      response,
      language: lang,
      timestamp: new Date().toISOString(),
    },
  });
});

export default router;
