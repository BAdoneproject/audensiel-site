'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import GitBranches from './GitBranches';

interface GitStep {
  command: string;
  expectedOutput: string | string[] | null;
  description: string;
  hint: string;
  success: string;
}

export default function Git() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [userCommand, setUserCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showBranches, setShowBranches] = useState(false);

  const gitSteps: GitStep[] = [
    {
      command: 'git init',
      expectedOutput: 'Initialized empty Git repository in your-project/.git/',
      description: "Création du dépôt Git local",
      hint: "Cette commande initialise un nouveau dépôt Git vide dans votre projet. Elle crée un dossier caché .git qui contiendra tout l'historique de votre code.",
      success: "✅ Dépôt Git initialisé avec succès !"
    },
    {
      command: 'git add .',
      expectedOutput: null,
      description: "Préparation des fichiers",
      hint: "Cette commande ajoute tous vos fichiers à la 'zone de staging'. C'est comme préparer un colis avant de l'envoyer : vous sélectionnez ce qui fera partie du prochain commit.",
      success: "✅ Fichiers ajoutés à la zone de staging"
    },
    {
      command: 'git commit -m "Initial commit"',
      expectedOutput: [
        "✨ [master (root-commit) 28a3650] Initial commit",
        "12 files changed, 350 insertions(+)",
        "create mode 100644 package.json",
        "create mode 100644 README.md",
        "..."
      ],
      description: "Crée le premier commit avec tous les fichiers",
      hint: "Le message entre guillemets décrit les changements effectués",
      success: "✅ Premier commit créé avec succès !"
    },
    {
      command: 'git remote add origin https://github.com/username/your-project.git',
      expectedOutput: null,
      description: "Connecte votre dépôt local à GitHub",
      hint: "Remplacez l'URL par celle de votre dépôt GitHub",
      success: "✅ Dépôt GitHub connecté avec succès ! Votre projet est prêt !"
    },
    {
      command: 'git push -u origin master',
      expectedOutput: [
        "Enumerating objects: 15, done.",
        "Counting objects: 100% (15/15), done.",
        "Delta compression using up to 8 threads",
        "Compressing objects: 100% (13/13), done.",
        "Writing objects: 100% (15/15), 1.62 KiB | 1.62 MiB/s, done.",
        "Total 15 (delta 0), reused 0 (delta 0)",
        "To https://github.com/username/your-project.git",
        " * [new branch] master -> master",
        "Branch 'master' set up to track remote branch 'master' from 'origin'."
      ],
      description: "(Optionnel) Envoie votre code sur GitHub",
      hint: "Cette étape peut être effectuée plus tard",
      success: "✅ Code pushé sur GitHub avec succès !"
    }
  ];

  const handleCommand = (command: string) => {
    const currentGitStep = gitSteps[currentStep];
    const normalizedCommand = command.trim().toLowerCase();
    const expectedCommand = currentGitStep.command.toLowerCase();

    setCommandHistory(prev => [...prev, `$ ${command}`]);

    if (normalizedCommand === expectedCommand) {
      if (Array.isArray(currentGitStep.expectedOutput)) {
        setCommandHistory(prev => [
          ...prev,
          ...(currentGitStep.expectedOutput as string[]),
          `\n${currentGitStep.success}\n`
        ]);
      } else if (currentGitStep.expectedOutput) {
        setCommandHistory(prev => [
          ...prev,
          currentGitStep.expectedOutput as string,
          `\n${currentGitStep.success}\n`
        ]);
      } else {
        setCommandHistory(prev => [...prev, `\n${currentGitStep.success}\n`]);
      }
      if (currentStep < gitSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setError('');
      } else if (currentStep === 3) {
        setTimeout(() => {
          setIsCompleted(true);
        }, 2000);
      }
    } else {
      setError(`Commande incorrecte. Essayez '${currentGitStep.command}'`);
    }
    setUserCommand('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyFeedback('Copié !');
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback('Erreur de copie');
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16 p-8 bg-white rounded-3xl shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)]">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Configuration Git
          </h1>

          <div className="mb-8">
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-3">
                🔄 Pourquoi utiliser Git ?
              </h2>
              <p className="text-blue-700 mb-4">
                Git est un outil essentiel pour tout développeur. Il vous permet de :
              </p>
              <ul className="space-y-2 text-blue-600">
                <li className="flex items-center gap-2">
                  <span className="text-xl">📝</span>
                  <span>Sauvegarder l&apos;historique de vos modifications</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span>Collaborer efficacement en équipe</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-xl">🔄</span>
                  <span>Revenir à des versions précédentes si nécessaire</span>
                </li>
              </ul>
            </div>

            <p className="text-gray-600 mb-6">
              Suivez les étapes ci-dessous pour initialiser Git dans votre projet et le connecter à GitHub.
            </p>

            {!showTerminal ? (
              <button
                onClick={() => setShowTerminal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>▶️</span>
                <span>Ouvrir le terminal</span>
              </button>
            ) : (
              <div className="flex gap-6">
                <div className="flex-1 bg-gray-900 text-gray-100 p-6 rounded-lg font-mono">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"/>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                      <div className="w-3 h-3 rounded-full bg-green-500"/>
                    </div>
                    <span className="text-sm text-gray-400">terminal</span>
                  </div>
                  <div className="h-80 overflow-y-auto mb-4">
                    {commandHistory.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">{line}</div>
                    ))}
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
                          if (e.key === 'Enter' && userCommand.trim()) {
                            handleCommand(userCommand);
                          }
                        }}
                        placeholder="Tapez votre commande git ici..."
                        className="bg-transparent border-none outline-none text-white flex-1 font-mono"
                        autoFocus
                      />
                      <span className="animate-pulse">|</span>
                    </div>
                    {error && (
                      <div className="text-red-400 text-sm mt-2">{error}</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCommand(userCommand)}
                      className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600 transition-colors"
                    >
                      Exécuter
                    </button>
                    <button
                      onClick={() => {
                        setCommandHistory([]);
                        setCurrentStep(0);
                      }}
                      className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600 transition-colors"
                    >
                      Recommencer
                    </button>
                  </div>
                </div>

                <div className="w-96 bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-4">Prochaine commande</h3>
                  <div className="text-sm text-gray-600 mb-4">
                    {gitSteps[currentStep].description}
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg relative">
                    <button
                      onClick={() => copyToClipboard(gitSteps[currentStep].command)}
                      className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full transition-colors group"
                      title="Copier la commande"
                    >
                      <span className="text-gray-500 group-hover:text-gray-700">📋</span>
                      {copyFeedback && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
                          {copyFeedback}
                        </span>
                      )}
                    </button>
                    <p className="font-mono text-sm text-blue-700">
                      {gitSteps[currentStep].command}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      💡 {gitSteps[currentStep].hint}
                    </p>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-200"
                      style={{ width: `${((currentStep + 1) / gitSteps.length) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-right">
                    Étape {currentStep + 1} / {gitSteps.length}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-12">
            <button
              onClick={() => setShowBranches(!showBranches)}
              className="w-full p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 flex items-center justify-between hover:from-blue-100 hover:to-purple-100 transition-colors"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  🌳 Gestion des Branches Git
                </h2>
                <p className="text-gray-600">
                  Créez des branches, ajoutez des commits et découvrez comment collaborer efficacement.
                </p>
              </div>
              <span className="text-2xl">
                {showBranches ? '↑' : '↓'}
              </span>
            </button>

            {showBranches && (
              <div className="mt-8">
                <GitBranches />
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-12">
            <Link
              href="/creation"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Création du projet
            </Link>
            <Link
              href="/database"
              className="bg-white px-6 py-3 rounded-lg shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] text-blue-600 hover:text-blue-800 transition-colors"
            >
              Étape suivante : Base de données →
            </Link>
          </div>
        </section>
      </main>

      {isCompleted && (
        <AnimatePresence mode="wait">
          <motion.div 
            key="modal"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              key="modal-content"
              className="bg-white p-8 rounded-xl max-w-md text-center relative overflow-hidden"
              initial={{ scale: 0.5, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.4 }}
            >
              <motion.div 
                className="text-6xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              >
                🎉
              </motion.div>

              <motion.h3 
                className="text-2xl font-bold text-gray-800 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Félicitations !
              </motion.h3>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-600 mb-6">
                  Vous avez configuré avec succès votre projet sur GitHub !
                </p>

                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-green-800 mb-2">Prochaines étapes :</h4>
                  <motion.ul className="text-green-700 text-sm space-y-2">
                    {[
                      "Créer de nouvelles branches pour vos fonctionnalités",
                      "Faire des commits réguliers de votre code",
                      "Collaborer avec d'autres développeurs"
                    ].map((step, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          ✓
                        </motion.span>
                        {step}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <motion.div 
                  className="flex justify-center gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <button
                    onClick={() => {
                      setCommandHistory([]);
                      setCurrentStep(0);
                      setIsCompleted(false);
                    }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Recommencer
                  </button>
                  <Link
                    href="/database"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Passer à la base de données →
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
