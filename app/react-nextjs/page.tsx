'use client';
import Link from 'next/link';
import { useState} from 'react';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

export default function ReactNextjs() {
  const [showNextJs, setShowNextJs] = useState(false);
  const [showClientContent, setShowClientContent] = useState(false);
  const [showServerContent, setShowServerContent] = useState(true);
  const [clientLoadingStep, setClientLoadingStep] = useState(0);
  const [serverLoadingStep, setServerLoadingStep] = useState(0);
  const [clientTimer, setClientTimer] = useState(0);
  const [serverTimer, setServerTimer] = useState(0);
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [todos, setTodos] = useState(['Apprendre React', 'Créer un composant']);
  const [newTodo, setNewTodo] = useState('');


  // Simulation du chargement côté client
  const handleClientSimulation = () => {
    setShowClientContent(false);
    setClientLoadingStep(0);
    setClientTimer(0);

    // Simulation des étapes de chargement
    const startTime = Date.now();
    
    // Étape 1: Chargement de React
    setTimeout(() => {
      setClientLoadingStep(1);
      setClientTimer(Date.now() - startTime);
    }, 800);

    // Étape 2: Requête API
    setTimeout(() => {
      setClientLoadingStep(2);
      setClientTimer(Date.now() - startTime);
    }, 1500);

    // Étape 3: Rendu final
    setTimeout(() => {
      setClientLoadingStep(3);
      setShowClientContent(true);
      setClientTimer(Date.now() - startTime);
    }, 2000);
  };

  // Simulation du chargement côté serveur
  const handleServerSimulation = () => {
    setShowServerContent(false);
    setServerLoadingStep(0);
    setServerTimer(0);

    const startTime = Date.now();

    // Étape 1: Traitement serveur
    setTimeout(() => {
      setServerLoadingStep(1);
      setServerTimer(Date.now() - startTime);
    }, 200);

    // Étape 2: Rendu final
    setTimeout(() => {
      setServerLoadingStep(2);
      setShowServerContent(true);
      setServerTimer(Date.now() - startTime);
    }, 300);
  };

  const getClientLoadingMessage = () => {
    switch(clientLoadingStep) {
      case 0: return "Démarrage du chargement...";
      case 1: return "Chargement de React...";
      case 2: return "Requête API en cours...";
      case 3: return "Rendu terminé !";
      default: return "";
    }
  };

  const getServerLoadingMessage = () => {
    switch(serverLoadingStep) {
      case 0: return "Démarrage du chargement...";
      case 1: return "Génération du HTML sur le serveur...";
      case 2: return "Rendu terminé !";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 p-8 bg-white rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Choisir un Framework
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Vue.js Card */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-green-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🟢</span>
                <h2 className="text-2xl font-bold text-green-600">Vue.js</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comme un couteau suisse : simple à utiliser mais polyvalent.
                Parfait pour ceux qui débutent dans le développement web.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Comme Lego® : facile à assembler</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Documentation claire comme de l&apos;eau de roche</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Idéal pour les petits projets</span>
                </li>
              </ul>
            </div>

            {/* React Card */}
            <div 
              onClick={() => setShowNextJs(!showNextJs)}
              className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-blue-500 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔵</span>
                <h2 className="text-2xl font-bold text-blue-600">React</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comme un moteur de F1 : puissant et optimisé.
                Le choix des professionnels pour les projets ambitieux.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Comme YouTube : une immense communauté</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Comme un smartphone : des milliers d&apos;extensions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  <span>Le plus populaire du marché</span>
                </li>
              </ul>
            </div>

            {/* Angular Card */}
            <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🔴</span>
                <h2 className="text-2xl font-bold text-red-600">Angular</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comme une usine : complet et structuré.
                Le choix des grandes entreprises qui veulent tout contrôler.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  <span>Comme une voiture neuve : tout est inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  <span>Structure rigide mais efficace</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">✓</span>
                  <span>Sécurité renforcée avec TypeScript</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Next.js Section */}
          {showNextJs && (
            <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-2xl mt-8 transform transition-all duration-300 animate-fade-in border-2 border-blue-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-600 p-3 rounded-xl">
                  <span className="text-3xl">⚡️</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-800">
                    Next.js : Le Superpouvoir de React
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Framework React qui rend votre application plus rapide, plus SEO-friendly et plus facile à développer
                  </p>
                </div>
              </div>
              
              {/* Call to Action */}


              {/* Principales fonctionnalités */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-blue-50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🚀</span>
                    <h4 className="text-xl font-semibold text-blue-700">Rendu Côté Serveur</h4>
                  </div>
                  <p className="text-gray-600 mb-4">Pages ultra rapides, parfaites pour :</p>
                  <ul className="space-y-2">
                    {["Tableaux de bord", "E-commerce", "Réseaux sociaux"].map(item => (
                      <li key={item} className="flex items-center gap-2 text-gray-600">
                        <span className="text-blue-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Répéter le même pattern pour les autres cartes... */}
              </div>

              {/* Démonstration CSR vs SSR */}
              <div className="bg-white p-6 rounded-lg mb-6">
                <h4 className="font-semibold mb-4">Démonstration CSR vs SSR</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Side Rendering */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-gray-800">Rendu Côté Client</h5>
                      <button 
                        onClick={handleClientSimulation}
                        className="px-3 py-1 bg-gray-100 rounded-md text-sm"
                      >
                        Simuler chargement
                      </button>
                    </div>
                    
                    <div className="min-h-[300px] bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <p className="text-sm font-medium">Temps écoulé: {clientTimer}ms</p>
                        <p className="text-sm text-blue-600">{getClientLoadingMessage()}</p>
                      </div>
                      
                      {!showClientContent ? (
                        <div className="space-y-4">
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="space-y-4 animate-fade-in">
                          <h6 className="font-medium">Article du blog</h6>
                          <p className="text-sm text-gray-600">
                            Contenu chargé après {clientTimer}ms.
                            Le chargement est plus long car il faut d&apos;abord charger React
                            puis faire une requête API.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Server Side Rendering */}
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-gray-800">Rendu Côté Serveur</h5>
                      <button 
                        onClick={handleServerSimulation}
                        className="px-3 py-1 bg-gray-100 rounded-md text-sm"
                      >
                        Simuler chargement
                      </button>
                    </div>
                    
                    <div className="min-h-[300px] bg-gray-50 rounded-lg p-4">
                      <div className="mb-4">
                        <p className="text-sm font-medium">Temps écoulé: {serverTimer}ms</p>
                        <p className="text-sm text-green-600">{getServerLoadingMessage()}</p>
                      </div>
                      
                      {showServerContent ? (
                        <div className="space-y-4 animate-fade-in">
                          <h6 className="font-medium">Article du blog</h6>
                          <p className="text-sm text-gray-600">
                            Contenu chargé en {serverTimer}ms.
                            Le HTML arrive déjà prêt depuis le serveur,
                            permettant un affichage quasi instantané.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timeline de comparaison */}
                <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                  <h5 className="text-2xl font-bold text-gray-800 mb-6">
                    Comparaison des Temps de Chargement
                  </h5>

                  <div className="space-y-12">
                    {/* Client Side Rendering */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <span className="text-xl">💻</span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">Client Side Rendering</p>
                          <p className="text-gray-600">Le navigateur fait tout le travail</p>
                        </div>
                      </div>

                      <div className="h-12 bg-gray-100 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-blue-200 w-1/4 flex items-center justify-center"
                             style={{ borderRadius: '0.5rem 0 0 0.5rem' }}>
                          <span className="text-sm font-medium text-blue-700">React</span>
                        </div>
                        <div className="absolute inset-y-0 left-1/4 bg-blue-300 w-1/4 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">API</span>
                        </div>
                        <div className="absolute inset-y-0 left-1/2 bg-blue-400 w-1/4 flex items-center justify-center"
                             style={{ borderRadius: '0 0.5rem 0.5rem 0' }}>
                          <span className="text-sm font-medium text-blue-900">Rendu</span>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between text-sm text-gray-500">
                        <span>0ms</span>
                        <span>~2000ms</span>
                      </div>
                    </div>

                    {/* Server Side Rendering */}
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <span className="text-xl">⚡️</span>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-gray-800">Server Side Rendering</p>
                          <p className="text-gray-600">Le serveur fait le gros du travail</p>
                        </div>
                      </div>

                      <div className="h-12 bg-gray-100 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-green-300 w-1/3 flex items-center justify-center"
                             style={{ borderRadius: '0.5rem 0 0 0.5rem' }}>
                          <span className="text-sm font-medium text-green-800">Serveur</span>
                        </div>
                        <div className="absolute inset-y-0 left-1/3 bg-green-400 w-1/6 flex items-center justify-center"
                             style={{ borderRadius: '0 0.5rem 0.5rem 0' }}>
                          <span className="text-sm font-medium text-green-900">Hydratation</span>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between text-sm text-gray-500">
                        <span>0ms</span>
                        <span>~300ms</span>
                      </div>
                    </div>
                  </div>

                  {/* Légende explicative */}
                  <div className="mt-8 grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl">
                    <div>
                      <h6 className="font-medium text-gray-800 mb-2">Client Side</h6>
                      <p className="text-sm text-gray-600">
                        Plus long mais plus dynamique. Idéal pour les applications très interactives 
                        comme les tableaux de bord.
                      </p>
                    </div>
                    <div>
                      <h6 className="font-medium text-gray-800 mb-2">Server Side</h6>
                      <p className="text-sm text-gray-600">
                        Plus rapide au chargement initial. Parfait pour les sites de contenu 
                        et le référencement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Démonstrations Interactives */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl mb-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-blue-800">
                      Concepts Clés de React en Action
                    </h4>
                    <p className="text-gray-600">
                      Découvrez la puissance de React à travers ces exemples interactifs
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* État et Réactivité */}
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">⚡️</span>
                      <h5 className="text-lg font-semibold text-gray-800">État et Réactivité</h5>
                    </div>
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl p-6 mb-4">
                        <p className="text-5xl font-bold mb-4">{count}</p>
                        <div className="space-x-3">
                          <button 
                            onClick={() => setCount(c => c - 1)}
                            className="w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-xl"
                          >
                            -
                          </button>
                          <button 
                            onClick={() => setCount(c => c + 1)}
                            className="w-12 h-12 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-xl"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        React met à jour instantanément l&apos;interface quand les données changent
                      </p>
                    </div>
                  </div>

                  {/* Thème Dynamique */}
                  <div 
                    className={`rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-700' 
                        : 'bg-white border-blue-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
                      <h5 className={`text-lg font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      }`}>
                        Thème Dynamique
                      </h5>
                    </div>
                    <div className="text-center">
                      <div className={`rounded-2xl p-6 mb-4 ${
                        theme === 'dark' 
                          ? 'bg-gray-800' 
                          : 'bg-blue-50'
                      }`}>
                        <button 
                          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
                          className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                            theme === 'dark' 
                              ? 'bg-white text-gray-900 hover:bg-gray-100' 
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          }`}
                        >
                          Mode {theme === 'light' ? 'sombre' : 'clair'}
                        </button>
                      </div>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Adaptez l&apos;interface à vos préférences en un clic
                      </p>
                    </div>
                  </div>

                  {/* Gestion de Liste */}
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">📝</span>
                      <h5 className="text-lg font-semibold text-gray-800">Liste Interactive</h5>
                    </div>
                    <div>
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <ul className="space-y-2 mb-4">
                          {todos.map((todo, index) => (
                            <li 
                              key={index} 
                              className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
                            >
                              <span className="text-gray-700">{todo}</span>
                              <button 
                                onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                                className="w-6 h-6 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                              >
                                ×
                              </button>
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Nouvelle tâche..."
                            className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-100 focus:border-blue-300 focus:outline-none"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && newTodo.trim()) {
                                setTodos([...todos, newTodo.trim()]);
                                setNewTodo('');
                              }
                            }}
                          />
                          <button 
                            onClick={() => {
                              if (newTodo.trim()) {
                                setTodos([...todos, newTodo.trim()]);
                                setNewTodo('');
                              }
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            Ajouter
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        Gérez facilement des listes dynamiques avec React
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explication des cas d'usage */}
              <div className="bg-white p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Concepts Clés de React en Action</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <h6 className="font-medium text-blue-600">Applications Interactives</h6>
                    <p>Parfait pour les tableaux de bord, les applications de gestion, 
                       où les données changent fréquemment</p>
                  </div>
                  <div>
                    <h6 className="font-medium text-blue-600">Personnalisation</h6>
                    <p>Idéal pour les applications avec des thèmes personnalisables, 
                       des préférences utilisateur</p>
                  </div>
                  <div>
                    <h6 className="font-medium text-blue-600">Gestion de Données</h6>
                    <p>Excellent pour les applications de type CRUD, les todo-lists, 
                       les interfaces d&apos;administration</p>
                  </div>
                </div>
              </div>

              {/* Avantages */}
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Cas d&apos;utilisation concrets</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-600">E-commerce</h5>
                    <p className="text-sm text-gray-600">
                      Nike.com utilise Next.js pour son catalogue produit : 
                      chargement rapide, SEO optimal, expérience utilisateur fluide
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600">Médias</h5>
                    <p className="text-sm text-gray-600">
                      TechCrunch exploite le SSR pour afficher instantanément les actualités 
                      et optimiser le référencement
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600">SaaS</h5>
                    <p className="text-sm text-gray-600">
                      Notion tire parti du routage dynamique pour sa documentation 
                      et ses espaces de travail personnalisés
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600">Finance</h5>
                    <p className="text-sm text-gray-600">
                      Scale.com utilise Next.js pour ses tableaux de bord temps réel 
                      et ses interfaces complexes
                    </p>
                  </div>
                </div>
              </div>

              {/* Démo Avancée: Dashboard Analytics */}
              <AnalyticsDashboard />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <Link
              href="/introduction"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Introduction
            </Link>
            <Link
              href="/creation"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              Créer le projet →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
