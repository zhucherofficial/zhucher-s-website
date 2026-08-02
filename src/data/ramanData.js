import meanSpectra from '../assets/project-media/raman/mean-spectra.png'
import benchmark from '../assets/project-media/raman/model-benchmark-cv.png'
import classificationBenchmark from '../assets/project-media/raman/classification-benchmark.png'
import confusion from '../assets/project-media/raman/classification-confusion.png'
import concentration from '../assets/project-media/raman/concentration-classification.png'
import holdout from '../assets/project-media/raman/concentration-loc-cv.png'
import regression from '../assets/project-media/raman/regression-per-compound.png'
import regressionBenchmark from '../assets/project-media/raman/regression-benchmark.png'
import regressionScatter from '../assets/project-media/raman/regression-scatter.png'
import jointPipelineScatter from '../assets/project-media/raman/joint-pipeline-scatter.png'
import peakVsConcentration from '../assets/project-media/raman/peak-vs-concentration.png'
import spectraByConcentration from '../assets/project-media/raman/spectra-by-concentration.png'
import concentrationConfusion from '../assets/project-media/raman/concentration-confusion.png'
import physicsScaled from '../assets/project-media/raman/physics-scaled-spectra.png'
import mcr from '../assets/project-media/raman/mcr-resolved-spectra.png'
import physicsConfusionKnn from '../assets/project-media/raman/physics/physics-confusion-knn.png'
import physicsConfusionLogistic from '../assets/project-media/raman/physics/physics-confusion-logistic.png'
import physicsConfusionLogisticPerCompound from '../assets/project-media/raman/physics/physics-confusion-logistic-legacy.png'
import physicsConfusionRandomForest from '../assets/project-media/raman/physics/physics-confusion-random-forest.png'
import physicsConfusionRandomForestPerCompound from '../assets/project-media/raman/physics/physics-confusion-random-forest-legacy.png'
import physicsConfusionSvmRbf from '../assets/project-media/raman/physics/physics-confusion-svm-rbf.png'

export const ramanDataset = {
  rawSpectra: 86,
  rawFiles: 158,
  rawTxtFiles: 86,
  rawCsvFiles: 72,
  processedIndexFiles: 1,
  uniqueRawStems: 86,
  processedSpectra: 86,
  denoisedSpectra: 86,
  analysisCsvOutputs: 80,
  archiveCsvFiles: 325,
  sourcePngFiles: 193,
  scanPngFiles: 172,
  aggregateFigures: 21,
  reportFiles: 10,
  scriptFiles: 7,
  sourceFolders: 5,
  sourceClasses: 6,
  roi: '400-1800 + 2800-3200 cm^-1',
  sourceFolder: '/Users/zhucher/Downloads/拉曼',
}

export const ramanScanCoverage = [
  { label: 'Lactobacillus', values: [0, 0, 0, 9, 0, 0, 0], total: 9 },
  { label: 'Water-Spinosin', values: [0, 5, 6, 6, 6, 6, 0], total: 29 },
  { label: 'Water-Mixed Std', values: [0, 3, 3, 3, 3, 3, 0], total: 15 },
  { label: 'Water-Jujuboside A', values: [0, 3, 3, 3, 3, 3, 0], total: 15 },
  { label: 'Water-Jujuboside B', values: [0, 3, 3, 3, 3, 3, 0], total: 15 },
  { label: 'Pure Water', values: [3, 0, 0, 0, 0, 0, 0], total: 3 },
]

export const ramanScanCoverageColumns = ['profile', '0.00', '0.02', '0.04', '0.06', '0.08', '0.10', 'unmapped']

export const ramanClassifierBenchmark = [
  { model: 'KNN', accuracy: 86.7, balanced: 86.7, f1: 87.0 },
  { model: 'Bernoulli NB', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'Gaussian NB', accuracy: 86.7, balanced: 86.7, f1: 87.0 },
  { model: 'Extra Trees', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'Logistic Regression', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'LDA', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'SVC', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'Nearest Centroid', accuracy: 86.7, balanced: 86.7, f1: 84.3 },
  { model: 'Random Forest', accuracy: 73.3, balanced: 73.3, f1: 71.3 },
  { model: 'SGD Classifier', accuracy: 66.7, balanced: 66.7, f1: 65.3 },
  { model: 'Ridge Classifier CV', accuracy: 66.7, balanced: 66.7, f1: 68.0 },
]

export const ramanModelBenchmark = [
  { model: 'Random Forest', accuracy: 82.7, spread: 5.3 },
  { model: 'Logistic Regression', accuracy: 78.7, spread: 7.8 },
  { model: 'KNN (k=3)', accuracy: 77.3, spread: 8 },
  { model: 'SVM (Linear)', accuracy: 76, spread: 6.8 },
  { model: 'SVM (RBF)', accuracy: 76, spread: 11.6 },
  { model: 'Extra Trees', accuracy: 76, spread: 10.8 },
  { model: 'KNN (k=5)', accuracy: 70.7, spread: 10.8 },
  { model: 'LDA', accuracy: 70.7, spread: 8 },
  { model: 'Gaussian NB', accuracy: 69.3, spread: 13.7 },
  { model: 'Gradient Boosting', accuracy: 56, spread: 13.7 },
]

export const ramanHoldoutAccuracy = [
  { concentration: '0.02', accuracy: 50 },
  { concentration: '0.04', accuracy: 66.7 },
  { concentration: '0.06', accuracy: 80 },
  { concentration: '0.08', accuracy: 66.7 },
  { concentration: '0.10', accuracy: 40 },
]

export const ramanRegression = [
  { compound: 'Water-Mixed Std', samples: 15, r2: 0.747, rmse: 0.0148 },
  { compound: 'Water-Jujuboside B', samples: 15, r2: 0.113, rmse: 0.0277 },
  { compound: 'Water-Jujuboside A', samples: 15, r2: 0.105, rmse: 0.0278 },
  { compound: 'Water-Spinosin', samples: 29, r2: 0.029, rmse: 0.0295 },
]

export const ramanClassOutcomes = [
  { label: 'Lactobacillus', precision: 1, recall: 1, f1: 1, support: 3 },
  { label: 'Water-Spinosin', precision: 1, recall: 0.67, f1: 0.8, support: 3 },
  { label: 'Water-Mixed Std', precision: 1, recall: 1, f1: 1, support: 3 },
  { label: 'Water-Jujuboside A', precision: 0.75, recall: 1, f1: 0.86, support: 3 },
  { label: 'Water-Jujuboside B', precision: 1, recall: 1, f1: 1, support: 3 },
  { label: 'Pure Water', precision: 0, recall: 0, f1: 0, support: 0 },
]

export const ramanConcentrationClassOutcomes = [
  { label: 'Water-Spinosin', precision: 0.6, recall: 1, f1: 0.75, support: 6 },
  { label: 'Water-Mixed Std', precision: 0, recall: 0, f1: 0, support: 3 },
  { label: 'Water-Jujuboside A', precision: 0.5, recall: 0.67, f1: 0.57, support: 3 },
  { label: 'Water-Jujuboside B', precision: 1, recall: 0.33, f1: 0.5, support: 3 },
]

export const ramanSubclassOutcomes = [
  { label: 'Lactobacillus @ 0.06 g/L', accuracy: 100, support: 3 },
  { label: 'Water-Spinosin @ 0.02 g/L', accuracy: 66.7, support: 3 },
  { label: 'Water-Mixed Std @ 0.08 g/L', accuracy: 100, support: 3 },
  { label: 'Water-Jujuboside A @ 0.04 g/L', accuracy: 100, support: 3 },
  { label: 'Water-Jujuboside B @ 0.02 g/L', accuracy: 100, support: 3 },
]

export const ramanConcentrationModels = [
  { model: 'SVM (RBF)', spectrumOnly: 73.3, spectrumPlus: 73.3 },
  { model: 'Logistic Regression', spectrumOnly: 73.3, spectrumPlus: 73.3 },
  { model: 'SVM (Linear)', spectrumOnly: 73.3, spectrumPlus: 73.3 },
  { model: 'KNN (k=5)', spectrumOnly: 66.7, spectrumPlus: 66.7 },
  { model: 'KNN (k=3)', spectrumOnly: 66.7, spectrumPlus: 66.7 },
  { model: 'Random Forest', spectrumOnly: 60, spectrumPlus: 60 },
  { model: 'Gradient Boosting', spectrumOnly: 53.3, spectrumPlus: 46.7 },
]

export const ramanGlobalRegression = [
  { model: 'SVM (Linear)', r2: -0.833, rmse: 0.0297, mae: 0.028 },
  { model: 'Ridge', r2: -0.851, rmse: 0.0298, mae: 0.0256 },
  { model: 'KNN (k=5)', r2: -1.082, rmse: 0.0316, mae: 0.0248 },
  { model: 'Random Forest', r2: -1.264, rmse: 0.033, mae: 0.031 },
  { model: 'KNN (k=3)', r2: -1.265, rmse: 0.033, mae: 0.028 },
  { model: 'Gradient Boosting', r2: -2.254, rmse: 0.0395, mae: 0.0365 },
]

export const ramanJointPipeline = [
  { stage: 'Stage 1 · classification', metric: 'Accuracy', value: '60.0%' },
  { stage: 'Stage 2 · predicted', metric: 'R² / RMSE / MAE', value: '-1.678 / 0.0359 / 0.0329' },
  { stage: 'Stage 2 · oracle', metric: 'R² / RMSE', value: '-1.467 / 0.0344' },
]

export const ramanPhysicsBenchmark = [
  { model: 'Random Forest', accuracy: 80, balanced: 80, f1: 78.1 },
  { model: 'Extra Trees', accuracy: 80, balanced: 80, f1: 80.3 },
  { model: 'Logistic Regression', accuracy: 66.7, balanced: 66.7, f1: 64.8 },
  { model: 'Ridge Classifier CV', accuracy: 66.7, balanced: 66.7, f1: 58 },
  { model: 'Calibrated Classifier', accuracy: 66.7, balanced: 66.7, f1: 64.3 },
  { model: 'Bagging', accuracy: 60, balanced: 60, f1: 62.2 },
  { model: 'Linear SVC', accuracy: 60, balanced: 60, f1: 53.7 },
  { model: 'Ridge Classifier', accuracy: 60, balanced: 60, f1: 52.8 },
  { model: 'Nearest Centroid', accuracy: 60, balanced: 60, f1: 60.8 },
  { model: 'AdaBoost', accuracy: 53.3, balanced: 53.3, f1: 55.0 },
  { model: 'XGBoost', accuracy: 53.3, balanced: 53.3, f1: 54.0 },
]

export const ramanCalibration = [
  { compound: 'Lactobacillus', peak: '1440-1470', method: 'OLS calibration', slope: 10.754, intercept: 10.73 },
  { compound: 'Water-Spinosin', peak: '1020-1040', method: 'OLS calibration', slope: -10.038, intercept: 8.519 },
  { compound: 'Water-Mixed Std', peak: '1020-1040', method: 'OLS calibration', slope: 4.288, intercept: 7.871 },
  { compound: 'Water-Jujuboside A', peak: '1050-1080', method: 'OLS calibration', slope: 20.396, intercept: 5.422 },
  { compound: 'Water-Jujuboside B', peak: '1050-1080', method: 'OLS calibration', slope: -12.994, intercept: 8.098 },
  { compound: 'Pure Water', peak: 'N/A', method: 'Max-norm', slope: null, intercept: null },
]

export const ramanMcrAccuracy = [
  { concentration: '0.00', accuracy: 50 },
  { concentration: '0.02', accuracy: 25 },
  { concentration: '0.04', accuracy: 25 },
  { concentration: '0.06', accuracy: 33.3 },
  { concentration: '0.08', accuracy: 25 },
  { concentration: '0.10', accuracy: 25 },
  { concentration: '0.36', accuracy: 100 },
]

export const ramanMcrClassOutcomes = [
  { label: 'Lactobacillus', precision: 1, recall: 0.89, f1: 0.94, support: 9 },
  { label: 'Water-Spinosin', precision: 0.23, recall: 1, f1: 0.38, support: 15 },
  { label: 'Water-Mixed Std', precision: 0, recall: 0, f1: 0, support: 15 },
  { label: 'Water-Jujuboside A', precision: 0, recall: 0, f1: 0, support: 15 },
  { label: 'Water-Jujuboside B', precision: 0, recall: 0, f1: 0, support: 15 },
  { label: 'Pure Water', precision: 0, recall: 0, f1: 0, support: 3 },
]

export const ramanAssets = {
  meanSpectra,
  benchmark,
  classificationBenchmark,
  confusion,
  concentration,
  holdout,
  regression,
  regressionBenchmark,
  regressionScatter,
  jointPipelineScatter,
  peakVsConcentration,
  spectraByConcentration,
  concentrationConfusion,
  physicsScaled,
  mcr,
  physicsConfusionKnn,
  physicsConfusionLogistic,
  physicsConfusionLogisticPerCompound,
  physicsConfusionRandomForest,
  physicsConfusionRandomForestPerCompound,
  physicsConfusionSvmRbf,
}
