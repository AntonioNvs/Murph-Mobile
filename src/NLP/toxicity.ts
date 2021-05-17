import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as toxicity from '@tensorflow-models/toxicity';

interface IToxicityReturn {
  label: string;
  match: boolean;
}

export default class ToxicityNLP {
  private threshold = 0.85;

  private model: toxicity.ToxicityClassifier;

  public labels = ['identity_attack', 'insult', 'obscene', 'severe_toxicity', 'sexual_explicit', 'threat', 'toxicity']

  private alreadyLoaded = false;

  constructor() {
    this.model = {} as toxicity.ToxicityClassifier;
  }

  private async loadModel(): Promise<void> {
    if (!this.alreadyLoaded) {
      await tf.setBackend('rn-webgl');

      await tf.ready();
      this.model = await toxicity.load(this.threshold, this.labels);

      this.alreadyLoaded = true;
    }
  }

  async classify(text: string): Promise<IToxicityReturn[]> {
    await this.loadModel();

    const model = await toxicity.load(this.threshold, this.labels);

    const rowPredictions = await model.classify([text]);

    const predictions: IToxicityReturn[] = rowPredictions.map((pred) => ({
      label: pred.label,
      match: pred.results[0].match,
    }));

    return predictions;
  }
}
