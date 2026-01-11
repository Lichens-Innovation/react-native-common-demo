import {
  ALL_MPNET_BASE_V2,
  MULTI_QA_MINILM_L6_COS_V1,
  MULTI_QA_MPNET_BASE_DOT_V1,
  QWEN3_0_6B_QUANTIZED,
  ResourceSource,
} from 'react-native-executorch';
import { RecursiveCharacterTextSplitter } from 'react-native-rag';
import { gigsToBytes } from '~/utils/file.utils';

export const LLAMA3_2_1B_SIZE = gigsToBytes(1.47);
export const MULTI_QA_MINILM_L6_COS_V1_SIZE = gigsToBytes(91 / 1024); // 91 MB
export const MULTI_QA_MPNET_BASE_DOT_V1_SIZE = gigsToBytes(420 / 1024); // ~420 MB
export const ALL_MPNET_BASE_V2_SIZE = gigsToBytes(420 / 1024); // ~420 MB

interface EmbeddingModel {
  modelSource: ResourceSource;
  tokenizerSource: ResourceSource;
}

interface ChatModel {
  modelSource: ResourceSource;
  tokenizerSource: ResourceSource;
  tokenizerConfigSource: ResourceSource;
}

type Model = EmbeddingModel | ChatModel;

interface ModelMetadata<T extends Model = Model> {
  name: string;
  totalSizeInBytes: number;
  model: T;
}

type EmbeddingModelMetadata = ModelMetadata<EmbeddingModel>;
type ChatModelMetadata = ModelMetadata<ChatModel>;

// Quantized models are better for mobile devices (good compromise between performance, efficiency and size)
// For multilingual RAG, we should try QWEN2_5_1_5B_QUANTIZED (0.5B, 1.5B and 3B available depending on perf.)
export const DEFAULT_CHAT_MODEL: ChatModelMetadata = {
  name: 'QWEN3_0_6B_QUANTIZED',
  totalSizeInBytes: LLAMA3_2_1B_SIZE, // TODO: update this to the actual size of the model
  model: QWEN3_0_6B_QUANTIZED,
};

export const MODELS_METADATA: ChatModelMetadata[] = [DEFAULT_CHAT_MODEL];

// Possible embedding models (in order of preference for multi-language queries)
// Notes:
// - getting load errors with the MULTI_QA_MPNET_BASE_DOT_V1
// - if ever the MULTI_QA_MPNET_BASE_DOT_V1 issue gets fixed, use .dot product instead of cosine similarity
export const POSSIBLE_EMBEDDING_MODELS: EmbeddingModelMetadata[] = [
  {
    name: 'MULTI_QA_MPNET_BASE_DOT_V1',
    totalSizeInBytes: MULTI_QA_MPNET_BASE_DOT_V1_SIZE,
    model: MULTI_QA_MPNET_BASE_DOT_V1,
  },
  {
    name: 'MULTI_QA_MINILM_L6_COS_V1',
    totalSizeInBytes: MULTI_QA_MINILM_L6_COS_V1_SIZE,
    model: MULTI_QA_MINILM_L6_COS_V1,
  },
  {
    name: 'ALL_MPNET_BASE_V2',
    totalSizeInBytes: ALL_MPNET_BASE_V2_SIZE,
    model: ALL_MPNET_BASE_V2,
  },
];
export const DEFAULT_EMBEDDING_MODEL: EmbeddingModelMetadata = POSSIBLE_EMBEDDING_MODELS[1];

export const EMBEDDING_DIM = 768;

// Note: 384 tokens maximum for model ALL_MPNET_BASE_V2.
// 1 token ≈≈≈ 4-5 chars in French (or around 4 in English)
export const DEFAULT_TEXT_SPLITTER = new RecursiveCharacterTextSplitter({ chunkSize: 800, chunkOverlap: 150 });
