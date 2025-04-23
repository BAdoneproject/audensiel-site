'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Deployment() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const deploymentSteps = [
    {
      title: "Préparation du Projet",
      icon: "📦",
      description: "Vérification des prérequis avant déploiement",
      checks: [
        { label: "Code poussé sur GitHub", status: "done" },
        { label: "Variables d'environnement configurées", status: "done" },
        { label: "Tests passés avec succès", status: "done" }
      ]
    },
    {
      title: "Configuration Vercel",
      icon: "⚙️",
      description: "Connexion et paramétrage de la plateforme",
      steps: [
        "Connexion avec le compte GitHub",
        "Import du repository",
        "Configuration du projet"
      ]
    },
    {
      title: "Déploiement",
      icon: "🚀",
      description: "Construction et mise en ligne du site",
      phases: [
        { name: "Build", duration: "45s" },
        { name: "Tests", duration: "15s" },
        { name: "Déploiement", duration: "30s" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 p-8 bg-white rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Déploiement de l&apos;Application
            </h1>
            <p className="text-gray-600">
              Mettre votre application en ligne avec Vercel en quelques clics
            </p>
          </div>

          <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-600 p-3 rounded-xl">
                <span className="text-3xl">🚀</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-800">
                  Comprendre le Déploiement et le CI/CD
                </h2>
                <p className="text-gray-600 mt-1">
                  De votre ordinateur jusqu&apos;aux utilisateurs : le voyage de votre code
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800 mb-3">
                  <span>🏗️</span>
                  Qu&apos;est-ce que le Déploiement ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Le déploiement, c&apos;est le processus qui permet de rendre votre application accessible aux utilisateurs sur Internet.
                  Imaginez que votre code est comme une boutique : le déploiement, c&apos;est l&apos;installation de cette boutique 
                  dans un centre commercial (le serveur) pour que les clients puissent y accéder.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800 mb-3">
                  <span>⚡</span>
                  Le CI/CD expliqué simplement
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    CI/CD (Intégration Continue / Déploiement Continu) est comme une chaîne de montage automatisée :
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2">🔄 CI : Intégration Continue</h4>
                      <p className="text-sm text-gray-600">
                        Vérifie automatiquement que votre code fonctionne bien :
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Tests automatiques
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Vérification de la qualité
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Détection des bugs
                          </li>
                        </ul>
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-purple-700 mb-2">🚀 CD : Déploiement Continu</h4>
                      <p className="text-sm text-gray-600">
                        Déploie automatiquement si tout est OK :
                        <ul className="mt-2 space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Construction de l&apos;application
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Déploiement automatique
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Mise en ligne
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-blue-800 mb-3">
                  <span>💪</span>
                  Pourquoi est-ce critique ?
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-700 mb-2">🔄 Rapidité</h4>
                    <p className="text-sm text-gray-700">
                      Déploiement automatique en quelques minutes au lieu de plusieurs heures manuellement
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <h4 className="font-medium text-green-700 mb-2">🛡️ Fiabilité</h4>
                    <p className="text-sm text-gray-700">
                      Détection automatique des bugs avant qu&apos;ils n&apos;atteignent les utilisateurs
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-700 mb-2">📈 Productivité</h4>
                    <p className="text-sm text-gray-700">
                      Les développeurs peuvent se concentrer sur le code plutôt que sur le déploiement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Étapes de déploiement */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {deploymentSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                
                {step.checks && (
                  <ul className="space-y-2">
                    {step.checks.map((check, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-700">{check.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {step.steps && (
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {step.steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                )}

                {step.phases && (
                  <div className="space-y-2">
                    {step.phases.map((phase, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">{phase.name}</span>
                        <span className="text-gray-500">{phase.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Simulation de déploiement */}
          <div className="bg-gray-900 text-white p-8 rounded-xl mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Console de Déploiement</h3>
              <button
                onClick={() => setIsDeploying(!isDeploying)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDeploying 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isDeploying ? 'Arrêter' : 'Déployer'}
              </button>
            </div>

            <div className="font-mono text-sm">
              {isDeploying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <p className="text-green-400">● Connexion à Vercel...</p>
                  <p className="text-blue-400">● Vérification des dépendances...</p>
                  <p className="text-purple-400">● Construction du projet...</p>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      onAnimationComplete={() => setDeploymentComplete(true)}
                    />
                  </div>
                  
                  {deploymentComplete && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 space-y-4"
                    >
                      <p className="text-green-400">✨ Déploiement réussi !</p>
                      <div className="bg-green-900/30 p-4 rounded-lg">
                        <p className="text-green-300 mb-2">
                          🎉 Félicitations ! Vous avez terminé la formation !
                        </p>
                        <Link 
                          href="/merci" 
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          → Votre site est en ligne ! Accédez en cliquant sur ce lien 
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* Avantages de Vercel */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Pourquoi Vercel ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">Déploiement Automatique</h4>
                <p className="text-sm text-gray-600">
                  Chaque push sur GitHub déclenche automatiquement un nouveau déploiement
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">Performance Optimale</h4>
                <p className="text-sm text-gray-600">
                  CDN mondial pour une diffusion ultra-rapide de votre site
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">Simplicité</h4>
                <p className="text-sm text-gray-600">
                  Interface intuitive et intégration parfaite avec Next.js
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link
              href="/database"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Base de données
            </Link>
            <Link
              href="/"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              Retour à l&apos;accueil →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
