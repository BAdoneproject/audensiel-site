'use client';
import { useState} from 'react';
import Link from 'next/link';

export default function Creation() {
  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStructure, setShowStructure] = useState(false);
  const [showRecap, setShowRecap] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [userCommand, setUserCommand] = useState('');
  const [error, setError] = useState('');

  const installSteps = [
    { 
      message: "Creating a new Next.js app...", 
      duration: 1000,
      description: "🏗️ Mise en place de l'architecture de base. Cette étape initialise la structure fondamentale de votre application Next.js avec les bonnes pratiques actuelles."
    },
    { 
      message: "Installing dependencies...", 
      duration: 2000,
      description: "🧰 Installation des dépendances essentielles. Ces packages constituent le socle technique de votre application et garantissent son bon fonctionnement."
    },
    { 
      message: "Installing react...", 
      duration: 800,
      description: "🎨 React, la bibliothèque centrale de votre application. Elle permet de construire des interfaces utilisateur interactives et performantes."
    },
    { 
      message: "Installing react-dom...", 
      duration: 800,
      description: "🖼️ React DOM gère le rendu de vos composants dans le navigateur. Il optimise les mises à jour de l'interface pour une expérience fluide."
    },
    { 
      message: "Installing typescript...", 
      duration: 1000,
      description: "🛡️ TypeScript renforce la robustesse de votre code. Il ajoute un système de types qui sécurise le développement et facilite la maintenance."
    },
    { 
      message: "Installing tailwindcss...", 
      duration: 1000,
      description: "✨ Tailwind CSS, un framework d'utilitaires CSS moderne. Il accélère le développement de l'interface en proposant une approche pragmatique du styling."
    },
    { 
      message: "Initializing git repository...", 
      duration: 500,
      description: "📸 Initialisation du versioning avec Git. Essentiel pour suivre l'évolution du code et collaborer efficacement en équipe."
    },
    { 
      message: "Creating project structure...", 
      duration: 1500,
      description: "📁 Organisation optimale des fichiers selon les conventions Next.js. Une structure claire facilite la scalabilité et la maintenance du projet."
    },
    { 
      message: "Success! Project is ready!", 
      duration: 0,
      description: "🚀 Configuration terminée ! Votre environnement de développement est prêt avec les meilleures pratiques de l'écosystème React et Next.js."
    }
  ];

  const projectStructure = [
    {
      title: "📁 Structure des Pages",
      description: "Organisation automatique des routes de votre site",
      items: [
        {
          icon: "🏠",
          path: "/app/page.tsx",
          desc: "Page d'accueil de votre site"
        },
        {
          icon: "🔄",
          path: "/app/[route]/page.tsx",
          desc: "Pages créées dynamiquement"
        },
        {
          icon: "📋",
          path: "/app/layout.tsx",
          desc: "Template principal (menu, footer...)"
        }
      ]
    },
    {
      title: "🧩 Composants",
      description: "Blocs réutilisables pour construire votre interface",
      items: [
        {
          icon: "🎨",
          path: "/components/ui/",
          desc: "Boutons, cartes, formulaires..."
        },
        {
          icon: "📐",
          path: "/components/layout/",
          desc: "En-têtes, menus, sections..."
        },
        {
          icon: "📝",
          path: "/components/forms/",
          desc: "Champs, validations, envois..."
        }
      ]
    },
    {
      title: "💅 Styles",
      description: "Personnalisation de l'apparence avec Tailwind",
      items: [
        {
          icon: "🎯",
          path: "/styles/globals.css",
          desc: "Styles appliqués partout"
        },
        {
          icon: "⚙️",
          path: "/tailwind.config.js",
          desc: "Personnalisation de Tailwind"
        },
        {
          icon: "🎭",
          path: "Classes Tailwind",
          desc: "Styles directement dans le HTML"
        }
      ]
    }
  ];

  const simulateInstallation = () => {
    setCurrentStep(0);
    let step = 0;

    const processStep = () => {
      if (step < installSteps.length - 1) {
        setTimeout(() => {
          setCurrentStep(++step);
          processStep();
        }, installSteps[step].duration);
      } else {
        setCurrentStep(installSteps.length - 1);
        setShowStructure(true);
      }
    };

    processStep();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 p-8 bg-white rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Création du Projet
          </h1>

          {!isCreating ? (
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                Pour créer un nouveau projet Next.js, tapez la commande suivante :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <code className="text-blue-600 font-mono">npx create-next-app</code>
                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-semibold mb-1">🛠️ Qu&apos;est-ce que NPX ?</p>
                    <p>
                      Imaginez NPX comme un assistant qui va chercher et utilise automatiquement 
                      la dernière version des outils dont vous avez besoin, sans avoir à les 
                      installer définitivement sur votre ordinateur. C&apos;est pratique et ça 
                      évite d&apos;encombrer votre machine !
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-semibold mb-1">🎯 À quoi sert create-next-app ?</p>
                    <p>C&apos;est l&apos;outil officiel qui va :</p>
                    <ul className="list-disc ml-6 space-y-1 mt-2">
                      <li>Créer la structure complète de votre site web</li>
                      <li>Installer tous les outils nécessaires en une seule fois</li>
                      <li>Configurer votre projet avec les meilleurs réglages</li>
                      <li>Vous faire gagner des heures de configuration manuelle</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="font-semibold">💡 Bon à savoir</p>
                    <p>
                      C&apos;est la méthode recommandée et utilisée par des milliers de 
                      développeurs pour démarrer un projet Next.js. C&apos;est un peu comme 
                      utiliser un modèle de document : tout est déjà bien organisé pour vous !
                    </p>
                  </div>
                </div>
              </div>
              {!showTerminal ? (
                <button
                  onClick={() => setShowTerminal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <span>▶️</span>
                  <span>Ouvrir le terminal</span>
                </button>
              ) : (
                <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                      <div className="w-3 h-3 rounded-full bg-green-500"/>
                    </div>
                    <span className="text-sm text-gray-400">terminal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      value={userCommand}
                      onChange={(e) => {
                        setUserCommand(e.target.value);
                        setError('');
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (userCommand.trim() === 'npx create-next-app') {
                            setIsCreating(true);
                            simulateInstallation();
                          } else {
                            setError("Commande non reconnue. Essayez 'npx create-next-app'");
                          }
                        }
                      }}
                      placeholder="Tapez votre commande ici..."
                      className="bg-transparent border-none outline-none text-white flex-1 font-mono"
                      autoFocus
                    />
                    <span className="animate-pulse">|</span>
                  </div>
                  {error && (
                    <div className="mt-2 text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        if (userCommand.trim() === 'npx create-next-app') {
                          setIsCreating(true);
                          simulateInstallation();
                        } else {
                          setError("Commande non reconnue. Essayez 'npx create-next-app'");
                        }
                      }}
                      className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600 transition-colors"
                    >
                      Exécuter
                    </button>
                    <button
                      onClick={() => setUserCommand('')}
                      className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-8 flex gap-6">
              <div className="flex-1 bg-gray-900 text-gray-100 p-6 rounded-lg font-mono">
                <div className="space-y-2">
                  {installSteps.slice(0, currentStep + 1).map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-400">$</span>
                      <span>{step.message}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-96 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">Étape en cours</h3>
                <div className="text-sm text-gray-600">
                  {installSteps[currentStep].description}
                </div>
                <div className="mt-4 h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-200"
                    style={{ width: `${((currentStep + 1) / installSteps.length) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-right">
                  {currentStep + 1} / {installSteps.length} étapes
                </div>
              </div>
            </div>
          )}

          {showStructure && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Structure du Projet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectStructure.map((section, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <span>{section.title}</span>
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">{section.description}</p>
                    <ul className="space-y-3">
                      {section.items.map((item, i) => (
                        <li 
                          key={i} 
                          className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <p className="text-gray-700 font-mono text-sm">{item.path}</p>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isCreating && (
            <>
              {currentStep === installSteps.length - 1 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => setShowRecap(!showRecap)}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    {showRecap ? (
                      <>
                        <span>Masquer le récapitulatif</span>
                        <span>↑</span>
                      </>
                    ) : (
                      <>
                        <span>Voir le récapitulatif des installations</span>
                        <span>↓</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {showRecap && (
                <div className="mt-6 bg-gray-50 rounded-lg p-6 animate-fade-in">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Récapitulatif des installations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {installSteps.slice(0, -1).map((step, index) => (
                      <div 
                        key={index}
                        className="bg-white p-4 rounded-lg border border-gray-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm">
                            ✓
                          </span>
                          <p className="font-mono text-sm text-gray-700">{step.message}</p>
                        </div>
                        <p className="text-sm text-gray-600 ml-8">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
                    <p className="font-medium">💡 À savoir</p>
                    <p className="mt-1">
                      Ces installations constituent la base de votre projet Next.js. 
                      Vous pourrez ajouter d&apos;autres dépendances selon vos besoins spécifiques.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between items-center mt-12">
            <Link
              href="/react-nextjs"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← React & Next.js
            </Link>
            <Link
              href="/git"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              Configurer Git →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
