export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  mr: 'मराठी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
};

type TranslationKeys = {
  // Navigation
  'nav.home': string;
  'nav.myVillage': string;
  'nav.applications': string;
  'nav.markets': string;
  'nav.settings': string;
  'nav.dashboard': string;
  'nav.services': string;
  'nav.grievances': string;
  'nav.community': string;
  'nav.voiceAssistant': string;
  'nav.help': string;
  'nav.logout': string;

  // Home
  'home.greeting': string;
  'home.subtitle': string;
  'home.weatherToday': string;
  'home.humidity': string;
  'home.wind': string;
  'home.healthScore': string;
  'home.healthy': string;
  'home.healthDesc': string;
  'home.excellent': string;
  'home.healthSuffix': string;
  'home.voiceQuestion': string;
  'home.voiceHint': string;
  'home.smartSuggestions': string;
  'home.takeAction': string;
  'home.updateNow': string;
  'home.communityHearth': string;
  'home.communitySubtitle': string;
  'home.viewAllUpdates': string;
  'home.alerts': string;

  // Admin
  'admin.controlCenter': string;
  'admin.districtOverview': string;
  'admin.subtitle': string;
  'admin.exportReport': string;
  'admin.newInitiative': string;
  'admin.activeRequests': string;
  'admin.fundsAllocated': string;
  'admin.budgetUtilization': string;
  'admin.devTrends': string;
  'admin.devTrendsDesc': string;
  'admin.monthly': string;
  'admin.yearly': string;
  'admin.aiIntelligence': string;
  'admin.urgentAnomaly': string;
  'admin.generateSolution': string;
  'admin.geoFeed': string;
  'admin.geoFeedDesc': string;
  'admin.serviceCompletion': string;
  'admin.pensions': string;
  'admin.landRecords': string;
  'admin.recentActivity': string;
  'admin.viewAll': string;

  // Issues
  'issues.title': string;
  'issues.subtitle': string;
  'issues.photo': string;
  'issues.location': string;
  'issues.category': string;
  'issues.captureIssue': string;
  'issues.uploadPrompt': string;
  'issues.uploadHint': string;
  'issues.detectLocation': string;
  'issues.detectedVillage': string;
  'issues.coordinates': string;
  'issues.adjustPin': string;
  'issues.categorizeIssue': string;
  'issues.roadFix': string;
  'issues.waterLeak': string;
  'issues.powerCut': string;
  'issues.wasteInfo': string;
  'issues.notesPlaceholder': string;
  'issues.submitIssue': string;
  'issues.submissionNote': string;
  'issues.successTitle': string;
  'issues.successMessage': string;

  // Voice
  'voice.greeting': string;
  'voice.listening': string;
  'voice.stopHint': string;
  'voice.cropInsurance': string;
  'voice.irrigationSubsidy': string;
  'voice.applyPanCard': string;

  // Novelty features
  'mandi.title': string;
  'mandi.subtitle': string;
  'mandi.perQuintal': string;
  'schemes.title': string;
  'schemes.subtitle': string;
  'schemes.beneficiaries': string;
  'schemes.deadline': string;
  'crop.title': string;
  'crop.subtitle': string;
  'sos.title': string;
  'sos.subtitle': string;
  'sos.callNow': string;

  // Common
  'common.askGramAI': string;
  'common.searchData': string;
  'common.language': string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    'nav.home': 'Home',
    'nav.myVillage': 'My Village',
    'nav.applications': 'Applications',
    'nav.markets': 'Markets',
    'nav.settings': 'Settings',
    'nav.dashboard': 'Dashboard',
    'nav.services': 'Services',
    'nav.grievances': 'Grievances',
    'nav.community': 'Community',
    'nav.voiceAssistant': 'Voice Assistant',
    'nav.help': 'Help',
    'nav.logout': 'Logout',
    'home.greeting': 'Namaste, Himanshu 👋',
    'home.subtitle': 'Welcome back to Digital Bharat.',
    'home.weatherToday': 'Weather Today',
    'home.humidity': 'Humidity',
    'home.wind': 'Wind',
    'home.healthScore': 'Village Health Score',
    'home.healthy': 'Healthy',
    'home.healthDesc': 'Village infra and livestock health is',
    'home.excellent': 'Excellent',
    'home.healthSuffix': 'this week.',
    'home.voiceQuestion': 'How can I help you today?',
    'home.voiceHint': '"Mera ration card status kya hai?"',
    'home.smartSuggestions': 'Smart Suggestions',
    'home.takeAction': 'Take Action',
    'home.updateNow': 'Update Now',
    'home.communityHearth': 'Community Hearth',
    'home.communitySubtitle': "What's happening in your village",
    'home.viewAllUpdates': 'View All Updates',
    'home.alerts': 'ALERTS:',
    'admin.controlCenter': 'Control Center',
    'admin.districtOverview': 'District Overview',
    'admin.subtitle': 'Live administrative monitoring and AI-assisted governance.',
    'admin.exportReport': 'Export Report',
    'admin.newInitiative': 'New Initiative',
    'admin.activeRequests': 'Active Requests',
    'admin.fundsAllocated': 'Funds Allocated',
    'admin.budgetUtilization': 'Budget Utilization',
    'admin.devTrends': 'Village Development Trends',
    'admin.devTrendsDesc': 'Comparison of Infrastructure vs Economic Growth over 12 months',
    'admin.monthly': 'Monthly',
    'admin.yearly': 'Yearly',
    'admin.aiIntelligence': 'AI Intelligence',
    'admin.urgentAnomaly': 'Urgent Anomaly',
    'admin.generateSolution': 'Generate Solution',
    'admin.geoFeed': 'Geo-Tagged Live Feed',
    'admin.geoFeedDesc': 'Active issues reported via mobile app in last 2 hours.',
    'admin.serviceCompletion': 'Service Completion',
    'admin.pensions': 'Pensions',
    'admin.landRecords': 'Land Records',
    'admin.recentActivity': 'Recent Activity',
    'admin.viewAll': 'View All',
    'issues.title': 'Report an Issue',
    'issues.subtitle': 'Your contribution helps keep our village thriving.',
    'issues.photo': 'Photo',
    'issues.location': 'Location',
    'issues.category': 'Category',
    'issues.captureIssue': 'Capture the Issue',
    'issues.uploadPrompt': 'Click to capture or upload a photo',
    'issues.uploadHint': 'JPG, PNG up to 10MB',
    'issues.detectLocation': 'Detect Location',
    'issues.detectedVillage': 'Detected Village',
    'issues.coordinates': 'Precise Coordinates',
    'issues.adjustPin': 'Adjust Pin',
    'issues.categorizeIssue': 'Categorize the Issue',
    'issues.roadFix': 'Road Fix',
    'issues.waterLeak': 'Water Leak',
    'issues.powerCut': 'Power Cut',
    'issues.wasteInfo': 'Waste Info',
    'issues.notesPlaceholder': 'Add a quick note or audio memo...',
    'issues.submitIssue': 'Submit Issue',
    'issues.submissionNote': 'Submission will be visible to your Village Head immediately.',
    'issues.successTitle': 'Issue Submitted!',
    'issues.successMessage': 'Your report has been sent to the Panchayat office. Track it under "My Grievances".',
    'voice.greeting': 'GramAI Voice Assistant - How can I help you today?',
    'voice.listening': 'Listening...',
    'voice.stopHint': 'Tap or say "Stop" to finish',
    'voice.cropInsurance': 'Crop Insurance Status',
    'voice.irrigationSubsidy': 'Irrigation Subsidy',
    'voice.applyPanCard': 'Apply for Pan Card',
    'mandi.title': 'Mandi Prices',
    'mandi.subtitle': 'Today\'s market rates',
    'mandi.perQuintal': '₹/quintal',
    'schemes.title': 'Government Schemes',
    'schemes.subtitle': 'Track your benefits',
    'schemes.beneficiaries': 'Beneficiaries',
    'schemes.deadline': 'Deadline',
    'crop.title': 'Crop Calendar',
    'crop.subtitle': 'Seasonal planting guide',
    'sos.title': 'SOS Emergency',
    'sos.subtitle': 'Tap for immediate help',
    'sos.callNow': 'Call Now',
    'common.askGramAI': 'Ask GramAI',
    'common.searchData': 'Search data...',
    'common.language': 'Language',
  },
  hi: {
    'nav.home': 'होम',
    'nav.myVillage': 'मेरा गाँव',
    'nav.applications': 'आवेदन',
    'nav.markets': 'बाज़ार',
    'nav.settings': 'सेटिंग्स',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.services': 'सेवाएं',
    'nav.grievances': 'शिकायतें',
    'nav.community': 'समुदाय',
    'nav.voiceAssistant': 'वॉइस सहायक',
    'nav.help': 'सहायता',
    'nav.logout': 'लॉग आउट',
    'home.greeting': 'नमस्ते, हिमांशु 👋',
    'home.subtitle': 'डिजिटल भारत में वापस स्वागत है।',
    'home.weatherToday': 'आज का मौसम',
    'home.humidity': 'नमी',
    'home.wind': 'हवा',
    'home.healthScore': 'गाँव स्वास्थ्य स्कोर',
    'home.healthy': 'स्वस्थ',
    'home.healthDesc': 'ग्राम अवसंरचना और पशु स्वास्थ्य',
    'home.excellent': 'उत्कृष्ट',
    'home.healthSuffix': 'इस सप्ताह है।',
    'home.voiceQuestion': 'आज मैं आपकी क्या मदद कर सकता हूँ?',
    'home.voiceHint': '"मेरा राशन कार्ड स्टेटस क्या है?"',
    'home.smartSuggestions': 'स्मार्ट सुझाव',
    'home.takeAction': 'कार्रवाई करें',
    'home.updateNow': 'अभी अपडेट करें',
    'home.communityHearth': 'सामुदायिक चूल्हा',
    'home.communitySubtitle': 'आपके गाँव में क्या हो रहा है',
    'home.viewAllUpdates': 'सभी अपडेट देखें',
    'home.alerts': 'सूचनाएं:',
    'admin.controlCenter': 'नियंत्रण केंद्र',
    'admin.districtOverview': 'जिला अवलोकन',
    'admin.subtitle': 'लाइव प्रशासनिक निगरानी और AI-सहायित शासन।',
    'admin.exportReport': 'रिपोर्ट डाउनलोड',
    'admin.newInitiative': 'नई पहल',
    'admin.activeRequests': 'सक्रिय अनुरोध',
    'admin.fundsAllocated': 'आवंटित निधि',
    'admin.budgetUtilization': 'बजट उपयोग',
    'admin.devTrends': 'ग्राम विकास रुझान',
    'admin.devTrendsDesc': '12 महीनों में बुनियादी ढांचे बनाम आर्थिक विकास की तुलना',
    'admin.monthly': 'मासिक',
    'admin.yearly': 'वार्षिक',
    'admin.aiIntelligence': 'AI इंटेलिजेंस',
    'admin.urgentAnomaly': 'आपातकालीन विसंगति',
    'admin.generateSolution': 'समाधान बनाएं',
    'admin.geoFeed': 'भौगोलिक लाइव फ़ीड',
    'admin.geoFeedDesc': 'पिछले 2 घंटों में मोबाइल ऐप से रिपोर्ट की गई सक्रिय समस्याएं।',
    'admin.serviceCompletion': 'सेवा पूर्णता',
    'admin.pensions': 'पेंशन',
    'admin.landRecords': 'भूमि अभिलेख',
    'admin.recentActivity': 'हालिया गतिविधि',
    'admin.viewAll': 'सभी देखें',
    'issues.title': 'समस्या दर्ज करें',
    'issues.subtitle': 'आपका योगदान हमारे गाँव को समृद्ध रखने में मदद करता है।',
    'issues.photo': 'तस्वीर',
    'issues.location': 'स्थान',
    'issues.category': 'श्रेणी',
    'issues.captureIssue': 'समस्या कैप्चर करें',
    'issues.uploadPrompt': 'तस्वीर खींचने या अपलोड करने के लिए क्लिक करें',
    'issues.uploadHint': 'JPG, PNG 10MB तक',
    'issues.detectLocation': 'स्थान पता करें',
    'issues.detectedVillage': 'पता लगाया गया गाँव',
    'issues.coordinates': 'सटीक निर्देशांक',
    'issues.adjustPin': 'पिन समायोजित करें',
    'issues.categorizeIssue': 'समस्या वर्गीकृत करें',
    'issues.roadFix': 'सड़क मरम्मत',
    'issues.waterLeak': 'पानी रिसाव',
    'issues.powerCut': 'बिजली कटौती',
    'issues.wasteInfo': 'कचरा सूचना',
    'issues.notesPlaceholder': 'एक त्वरित नोट या ऑडियो मेमो जोड़ें...',
    'issues.submitIssue': 'समस्या जमा करें',
    'issues.submissionNote': 'सबमिशन तुरंत आपके ग्राम प्रधान को दिखाई देगा।',
    'issues.successTitle': 'समस्या दर्ज हो गई!',
    'issues.successMessage': 'आपकी रिपोर्ट पंचायत कार्यालय को भेज दी गई है। "मेरी शिकायतें" में ट्रैक करें।',
    'voice.greeting': 'GramAI वॉइस सहायक - आज मैं आपकी क्या मदद कर सकता हूँ?',
    'voice.listening': 'सुन रहा हूँ...',
    'voice.stopHint': 'रोकने के लिए टैप करें या "बंद करो" बोलें',
    'voice.cropInsurance': 'फसल बीमा स्थिति',
    'voice.irrigationSubsidy': 'सिंचाई अनुदान',
    'voice.applyPanCard': 'पैन कार्ड आवेदन',
    'mandi.title': 'मंडी भाव',
    'mandi.subtitle': 'आज के बाज़ार दर',
    'mandi.perQuintal': '₹/क्विंटल',
    'schemes.title': 'सरकारी योजनाएं',
    'schemes.subtitle': 'अपने लाभ ट्रैक करें',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.deadline': 'अंतिम तिथि',
    'crop.title': 'फसल कैलेंडर',
    'crop.subtitle': 'मौसमी बुआई मार्गदर्शिका',
    'sos.title': 'SOS आपातकालीन',
    'sos.subtitle': 'तुरंत सहायता के लिए टैप करें',
    'sos.callNow': 'अभी कॉल करें',
    'common.askGramAI': 'GramAI से पूछें',
    'common.searchData': 'डेटा खोजें...',
    'common.language': 'भाषा',
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.myVillage': 'माझं गाव',
    'nav.applications': 'अर्ज',
    'nav.markets': 'बाजार',
    'nav.settings': 'सेटिंग्ज',
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.services': 'सेवा',
    'nav.grievances': 'तक्रारी',
    'nav.community': 'समुदाय',
    'nav.voiceAssistant': 'व्हॉइस सहाय्यक',
    'nav.help': 'मदत',
    'nav.logout': 'बाहेर पडा',
    'home.greeting': 'नमस्कार, हिमांशु 👋',
    'home.subtitle': 'डिजिटल भारतमध्ये पुन्हा स्वागत.',
    'home.weatherToday': 'आजचे हवामान',
    'home.humidity': 'आर्द्रता',
    'home.wind': 'वारा',
    'home.healthScore': 'गाव आरोग्य स्कोअर',
    'home.healthy': 'निरोगी',
    'home.healthDesc': 'गावाचा पायाभूत आणि पशुधन आरोग्य',
    'home.excellent': 'उत्कृष्ट',
    'home.healthSuffix': 'या आठवड्यात आहे.',
    'home.voiceQuestion': 'आज मी तुम्हाला कशी मदत करू शकतो?',
    'home.voiceHint': '"माझा रेशन कार्ड स्टेटस काय आहे?"',
    'home.smartSuggestions': 'स्मार्ट सूचना',
    'home.takeAction': 'कारवाई करा',
    'home.updateNow': 'आता अपडेट करा',
    'home.communityHearth': 'सामुदायिक चूल',
    'home.communitySubtitle': 'तुमच्या गावात काय चालू आहे',
    'home.viewAllUpdates': 'सर्व अपडेट्स पहा',
    'home.alerts': 'सूचना:',
    'admin.controlCenter': 'नियंत्रण केंद्र',
    'admin.districtOverview': 'जिल्हा विहंगावलोकन',
    'admin.subtitle': 'थेट प्रशासकीय देखरेख आणि AI-सहाय्यित शासन.',
    'admin.exportReport': 'अहवाल डाउनलोड',
    'admin.newInitiative': 'नवीन उपक्रम',
    'admin.activeRequests': 'सक्रिय विनंत्या',
    'admin.fundsAllocated': 'वितरित निधी',
    'admin.budgetUtilization': 'अर्थसंकल्प वापर',
    'admin.devTrends': 'ग्राम विकास कल',
    'admin.devTrendsDesc': '12 महिन्यांत पायाभूत सुविधा विरुद्ध आर्थिक वाढ',
    'admin.monthly': 'मासिक',
    'admin.yearly': 'वार्षिक',
    'admin.aiIntelligence': 'AI बुद्धिमत्ता',
    'admin.urgentAnomaly': 'तातडी विसंगती',
    'admin.generateSolution': 'उपाय तयार करा',
    'admin.geoFeed': 'भौगोलिक लाइव्ह फीड',
    'admin.geoFeedDesc': 'गेल्या 2 तासांत मोबाइल ॲपवरून नोंदवलेल्या समस्या.',
    'admin.serviceCompletion': 'सेवा पूर्णता',
    'admin.pensions': 'पेन्शन',
    'admin.landRecords': 'भूमी अभिलेख',
    'admin.recentActivity': 'अलीकडील कार्यवाही',
    'admin.viewAll': 'सर्व पहा',
    'issues.title': 'समस्या नोंदवा',
    'issues.subtitle': 'तुमचं योगदान आपलं गाव समृद्ध ठेवतं.',
    'issues.photo': 'फोटो',
    'issues.location': 'ठिकाण',
    'issues.category': 'श्रेणी',
    'issues.captureIssue': 'समस्या कॅप्चर करा',
    'issues.uploadPrompt': 'फोटो काढण्यासाठी किंवा अपलोड करण्यासाठी क्लिक करा',
    'issues.uploadHint': 'JPG, PNG 10MB पर्यंत',
    'issues.detectLocation': 'ठिकाण शोधा',
    'issues.detectedVillage': 'सापडलेलं गाव',
    'issues.coordinates': 'अचूक निर्देशांक',
    'issues.adjustPin': 'पिन ॲडजस्ट करा',
    'issues.categorizeIssue': 'समस्या वर्गीकरण करा',
    'issues.roadFix': 'रस्ता दुरुस्ती',
    'issues.waterLeak': 'पाणी गळती',
    'issues.powerCut': 'वीज कपात',
    'issues.wasteInfo': 'कचरा माहिती',
    'issues.notesPlaceholder': 'एक जलद टीप किंवा ऑडिओ मेमो जोडा...',
    'issues.submitIssue': 'समस्या सबमिट करा',
    'issues.submissionNote': 'सबमिशन लगेच तुमच्या सरपंचांना दिसेल.',
    'issues.successTitle': 'समस्या नोंदवली!',
    'issues.successMessage': 'तुमची तक्रार पंचायत कार्यालयाला पाठवली गेली.',
    'voice.greeting': 'GramAI व्हॉइस सहाय्यक - आज मी तुम्हाला कशी मदत करू?',
    'voice.listening': 'ऐकत आहे...',
    'voice.stopHint': 'थांबवण्यासाठी टॅप करा',
    'voice.cropInsurance': 'पीक विमा स्थिती',
    'voice.irrigationSubsidy': 'सिंचन अनुदान',
    'voice.applyPanCard': 'पॅन कार्ड अर्ज',
    'mandi.title': 'मंडी भाव',
    'mandi.subtitle': 'आजचे बाजार दर',
    'mandi.perQuintal': '₹/क्विंटल',
    'schemes.title': 'सरकारी योजना',
    'schemes.subtitle': 'तुमचे लाभ ट्रॅक करा',
    'schemes.beneficiaries': 'लाभार्थी',
    'schemes.deadline': 'अंतिम तारीख',
    'crop.title': 'पीक कॅलेंडर',
    'crop.subtitle': 'हंगामी लागवड मार्गदर्शक',
    'sos.title': 'SOS आपत्कालीन',
    'sos.subtitle': 'तात्काळ मदतीसाठी टॅप करा',
    'sos.callNow': 'आता कॉल करा',
    'common.askGramAI': 'GramAI ला विचारा',
    'common.searchData': 'डेटा शोधा...',
    'common.language': 'भाषा',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.myVillage': 'எனது கிராமம்',
    'nav.applications': 'விண்ணப்பங்கள்',
    'nav.markets': 'சந்தை',
    'nav.settings': 'அமைப்புகள்',
    'nav.dashboard': 'டாஷ்போர்ட்',
    'nav.services': 'சேவைகள்',
    'nav.grievances': 'குறைகள்',
    'nav.community': 'சமூகம்',
    'nav.voiceAssistant': 'குரல் உதவியாளர்',
    'nav.help': 'உதவி',
    'nav.logout': 'வெளியேறு',
    'home.greeting': 'வணக்கம், ஹிமான்ஷு 👋',
    'home.subtitle': 'டிஜிட்டல் பாரதத்திற்கு மீண்டும் வரவேற்கிறோம்.',
    'home.weatherToday': 'இன்றைய வானிலை',
    'home.humidity': 'ஈரப்பதம்',
    'home.wind': 'காற்று',
    'home.healthScore': 'கிராம ஆரோக்கிய மதிப்பெண்',
    'home.healthy': 'ஆரோக்கியம்',
    'home.healthDesc': 'கிராம உள்கட்டமைப்பு மற்றும் கால்நடை ஆரோக்கியம்',
    'home.excellent': 'சிறந்தது',
    'home.healthSuffix': 'இந்த வாரம்.',
    'home.voiceQuestion': 'இன்று உங்களுக்கு எப்படி உதவ முடியும்?',
    'home.voiceHint': '"என் ரேஷன் கார்டு நிலை என்ன?"',
    'home.smartSuggestions': 'ஸ்மார்ட் பரிந்துரைகள்',
    'home.takeAction': 'நடவடிக்கை எடு',
    'home.updateNow': 'இப்போது புதுப்பி',
    'home.communityHearth': 'சமூக கூடல்',
    'home.communitySubtitle': 'உங்கள் கிராமத்தில் என்ன நடக்கிறது',
    'home.viewAllUpdates': 'அனைத்து புதுப்பிப்புகள்',
    'home.alerts': 'அறிவிப்புகள்:',
    'admin.controlCenter': 'கட்டுப்பாட்டு மையம்',
    'admin.districtOverview': 'மாவட்ட கண்ணோட்டம்',
    'admin.subtitle': 'நேரடி நிர்வாக கண்காணிப்பு.',
    'admin.exportReport': 'அறிக்கை பதிவிறக்கம்',
    'admin.newInitiative': 'புதிய முன்முயற்சி',
    'admin.activeRequests': 'செயலில் கோரிக்கைகள்',
    'admin.fundsAllocated': 'ஒதுக்கப்பட்ட நிதி',
    'admin.budgetUtilization': 'பட்ஜெட் பயன்பாடு',
    'admin.devTrends': 'கிராம வளர்ச்சி போக்கு',
    'admin.devTrendsDesc': '12 மாதங்களில் உள்கட்டமைப்பு vs பொருளாதார வளர்ச்சி',
    'admin.monthly': 'மாதாந்திர',
    'admin.yearly': 'ஆண்டு',
    'admin.aiIntelligence': 'AI நுண்ணறிவு',
    'admin.urgentAnomaly': 'அவசர முரண்பாடு',
    'admin.generateSolution': 'தீர்வு உருவாக்கு',
    'admin.geoFeed': 'புவி-குறி நேரடி ஊட்டம்',
    'admin.geoFeedDesc': 'கடந்த 2 மணி நேரத்தில் புகாரிடப்பட்ட பிரச்சனைகள்.',
    'admin.serviceCompletion': 'சேவை நிறைவு',
    'admin.pensions': 'ஓய்வூதியம்',
    'admin.landRecords': 'நில பதிவுகள்',
    'admin.recentActivity': 'சமீபத்திய செயல்பாடு',
    'admin.viewAll': 'அனைத்தும் பார்',
    'issues.title': 'பிரச்சனை புகார்',
    'issues.subtitle': 'உங்கள் பங்களிப்பு எங்கள் கிராமத்தை வளமாக வைக்கிறது.',
    'issues.photo': 'புகைப்படம்',
    'issues.location': 'இடம்',
    'issues.category': 'பிரிவு',
    'issues.captureIssue': 'பிரச்சனையை படமெடு',
    'issues.uploadPrompt': 'புகைப்படம் எடுக்க அல்லது பதிவேற்ற கிளிக் செய்யுங்கள்',
    'issues.uploadHint': 'JPG, PNG 10MB வரை',
    'issues.detectLocation': 'இடம் கண்டறி',
    'issues.detectedVillage': 'கண்டறியப்பட்ட கிராமம்',
    'issues.coordinates': 'துல்லியமான ஆயக்கூறுகள்',
    'issues.adjustPin': 'பின் சரிசெய்',
    'issues.categorizeIssue': 'பிரச்சனையை வகைப்படுத்து',
    'issues.roadFix': 'சாலை பழுது',
    'issues.waterLeak': 'நீர் கசிவு',
    'issues.powerCut': 'மின்தடை',
    'issues.wasteInfo': 'கழிவு தகவல்',
    'issues.notesPlaceholder': 'ஒரு விரைவு குறிப்பு சேர்க்கவும்...',
    'issues.submitIssue': 'புகார் சமர்ப்பி',
    'issues.submissionNote': 'உங்கள் கிராம தலைவருக்கு உடனடியாகக் காண்பிக்கப்படும்.',
    'issues.successTitle': 'புகார் சமர்ப்பிக்கப்பட்டது!',
    'issues.successMessage': 'உங்கள் புகார் பஞ்சாயத்து அலுவலகத்திற்கு அனுப்பப்பட்டது.',
    'voice.greeting': 'GramAI குரல் உதவியாளர் - எப்படி உதவ முடியும்?',
    'voice.listening': 'கேட்கிறேன்...',
    'voice.stopHint': 'நிறுத்த தட்டவும்',
    'voice.cropInsurance': 'பயிர் காப்பீடு நிலை',
    'voice.irrigationSubsidy': 'நீர்ப்பாசன மானியம்',
    'voice.applyPanCard': 'பான் கார்டு விண்ணப்பம்',
    'mandi.title': 'மண்டி விலை',
    'mandi.subtitle': 'இன்றைய சந்தை விலை',
    'mandi.perQuintal': '₹/குவிண்டால்',
    'schemes.title': 'அரசு திட்டங்கள்',
    'schemes.subtitle': 'உங்கள் பலன்களை கண்காணி',
    'schemes.beneficiaries': 'பயனாளிகள்',
    'schemes.deadline': 'கடைசி நாள்',
    'crop.title': 'பயிர் நாட்காட்டி',
    'crop.subtitle': 'பருவ நடவு வழிகாட்டி',
    'sos.title': 'SOS அவசரம்',
    'sos.subtitle': 'உடனடி உதவிக்கு தட்டவும்',
    'sos.callNow': 'இப்போது அழை',
    'common.askGramAI': 'GramAI யிடம் கேளுங்கள்',
    'common.searchData': 'தேடு...',
    'common.language': 'மொழி',
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.myVillage': 'నా గ్రామం',
    'nav.applications': 'దరఖాస్తులు',
    'nav.markets': 'మార్కెట్',
    'nav.settings': 'సెట్టింగ్‌లు',
    'nav.dashboard': 'డ్యాష్‌బోర్డ్',
    'nav.services': 'సేవలు',
    'nav.grievances': 'ఫిర్యాదులు',
    'nav.community': 'సమాజం',
    'nav.voiceAssistant': 'వాయిస్ సహాయకుడు',
    'nav.help': 'సహాయం',
    'nav.logout': 'లాగ్ అవుట్',
    'home.greeting': 'నమస్తే, హిమాన్షు 👋',
    'home.subtitle': 'డిజిటల్ భారత్‌కు తిరిగి స్వాగతం.',
    'home.weatherToday': 'నేటి వాతావరణం',
    'home.humidity': 'తేమ',
    'home.wind': 'గాలి',
    'home.healthScore': 'గ్రామ ఆరోగ్య స్కోరు',
    'home.healthy': 'ఆరోగ్యం',
    'home.healthDesc': 'గ్రామ మౌలిక సదుపాయాలు మరియు పశువుల ఆరోగ్యం',
    'home.excellent': 'అద్భుతం',
    'home.healthSuffix': 'ఈ వారం.',
    'home.voiceQuestion': 'ఈరోజు మీకు ఎలా సహాయం చేయగలను?',
    'home.voiceHint': '"నా రేషన్ కార్డ్ స్టేటస్ ఏమిటి?"',
    'home.smartSuggestions': 'స్మార్ట్ సూచనలు',
    'home.takeAction': 'చర్య తీసుకో',
    'home.updateNow': 'ఇప్పుడు అప్‌డేట్ చేయి',
    'home.communityHearth': 'సమాజ వేదిక',
    'home.communitySubtitle': 'మీ గ్రామంలో ఏమి జరుగుతోంది',
    'home.viewAllUpdates': 'అన్ని అప్‌డేట్‌లు చూడు',
    'home.alerts': 'హెచ్చరికలు:',
    'admin.controlCenter': 'నియంత్రణ కేంద్రం',
    'admin.districtOverview': 'జిల్లా అవలోకనం',
    'admin.subtitle': 'లైవ్ పరిపాలనా పర్యవేక్షణ.',
    'admin.exportReport': 'నివేదిక డౌన్‌లోడ్',
    'admin.newInitiative': 'కొత్త చొరవ',
    'admin.activeRequests': 'సక్రియ అభ్యర్థనలు',
    'admin.fundsAllocated': 'కేటాయించిన నిధులు',
    'admin.budgetUtilization': 'బడ్జెట్ వినియోగం',
    'admin.devTrends': 'గ్రామ అభివృద్ధి ధోరణులు',
    'admin.devTrendsDesc': '12 నెలల్లో మౌలిక సదుపాయాలు vs ఆర్థిక వృద్ధి',
    'admin.monthly': 'నెలవారీ',
    'admin.yearly': 'సంవత్సరం',
    'admin.aiIntelligence': 'AI మేధస్సు',
    'admin.urgentAnomaly': 'అత్యవసర అసాధారణత',
    'admin.generateSolution': 'పరిష్కారం రూపొందించు',
    'admin.geoFeed': 'భౌగోళిక లైవ్ ఫీడ్',
    'admin.geoFeedDesc': 'గత 2 గంటల్లో రిపోర్ట్ చేయబడిన సమస్యలు.',
    'admin.serviceCompletion': 'సేవా పూర్తి',
    'admin.pensions': 'పెన్షన్లు',
    'admin.landRecords': 'భూమి రికార్డులు',
    'admin.recentActivity': 'ఇటీవలి కార్యాచరణ',
    'admin.viewAll': 'అన్నీ చూడు',
    'issues.title': 'సమస్య నివేదించు',
    'issues.subtitle': 'మీ సహకారం మా గ్రామాన్ని అభివృద్ధి చేస్తుంది.',
    'issues.photo': 'ఫోటో',
    'issues.location': 'స్థానం',
    'issues.category': 'వర్గం',
    'issues.captureIssue': 'సమస్యను క్యాప్చర్ చేయండి',
    'issues.uploadPrompt': 'ఫోటో తీయడానికి లేదా అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి',
    'issues.uploadHint': 'JPG, PNG 10MB వరకు',
    'issues.detectLocation': 'స్థానం కనుగొను',
    'issues.detectedVillage': 'కనుగొన్న గ్రామం',
    'issues.coordinates': 'ఖచ్చితమైన కోఆర్డినేట్‌లు',
    'issues.adjustPin': 'పిన్ సర్దుబాటు',
    'issues.categorizeIssue': 'సమస్యను వర్గీకరించు',
    'issues.roadFix': 'రోడ్డు మరమ్మతు',
    'issues.waterLeak': 'నీటి లీకేజి',
    'issues.powerCut': 'కరెంటు కట్',
    'issues.wasteInfo': 'చెత్త సమాచారం',
    'issues.notesPlaceholder': 'ఒక క్విక్ నోట్ జోడించండి...',
    'issues.submitIssue': 'సమస్య సబ్మిట్ చేయండి',
    'issues.submissionNote': 'మీ గ్రామ ప్రధానికి వెంటనే కనిపిస్తుంది.',
    'issues.successTitle': 'సమస్య సబ్మిట్ అయింది!',
    'issues.successMessage': 'మీ రిపోర్ట్ పంచాయతీ కార్యాలయానికి పంపబడింది.',
    'voice.greeting': 'GramAI వాయిస్ సహాయకుడు - ఎలా సహాయం చేయగలను?',
    'voice.listening': 'వింటున్నాను...',
    'voice.stopHint': 'ఆపడానికి ట్యాప్ చేయండి',
    'voice.cropInsurance': 'పంట బీమా స్థితి',
    'voice.irrigationSubsidy': 'నీటిపారుదల సబ్సిడీ',
    'voice.applyPanCard': 'పాన్ కార్డ్ దరఖాస్తు',
    'mandi.title': 'మండీ ధరలు',
    'mandi.subtitle': 'నేటి మార్కెట్ ధరలు',
    'mandi.perQuintal': '₹/క్వింటాల్',
    'schemes.title': 'ప్రభుత్వ పథకాలు',
    'schemes.subtitle': 'మీ ప్రయోజనాలను ట్రాక్ చేయండి',
    'schemes.beneficiaries': 'లబ్ధిదారులు',
    'schemes.deadline': 'చివరి తేదీ',
    'crop.title': 'పంట క్యాలెండర్',
    'crop.subtitle': 'సీజనల్ నాటే గైడ్',
    'sos.title': 'SOS అత్యవసరం',
    'sos.subtitle': 'తక్షణ సహాయం కోసం ట్యాప్ చేయండి',
    'sos.callNow': 'ఇప్పుడు కాల్ చేయండి',
    'common.askGramAI': 'GramAI ని అడగండి',
    'common.searchData': 'వెతుకు...',
    'common.language': 'భాష',
  },
};

export default translations;
