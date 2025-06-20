import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const DEFAULT_API_KEY = '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';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  error?: string;
}

export const chatApi = {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      console.log('Sending message to OpenAI:', message);
      
      const messages: Message[] = [
        {
          role: 'system',
          content: 'Bạn là một trợ lý dinh dưỡng thông minh, chuyên gia về sức khỏe và dinh dưỡng. Hãy trả lời bằng tiếng Việt.'
        },
        {
          role: 'user',
          content: message
        }
      ];

      const requestData = {
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      };

      console.log('Request data:', JSON.stringify(requestData, null, 2));

      const response = await axios({
        method: 'post',
        url: API_URL,
        headers: {
          'Authorization': `Bearer ${DEFAULT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        data: requestData,
        timeout: 30000, // 30 seconds timeout
      });

      console.log('OpenAI Response:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.choices && response.data.choices[0]) {
        return {
          message: response.data.choices[0].message.content
        };
      } else {
        throw new Error('Invalid response format from OpenAI');
      }
    } catch (error) {
      console.error('Chat API Error Details:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios Error Response:', error.response?.data);
        console.error('Axios Error Status:', error.response?.status);
        console.error('Axios Error Headers:', error.response?.headers);
        
        return {
          message: '',
          error: `Lỗi kết nối: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`
        };
      }
      
      return {
        message: '',
        error: error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi tin nhắn'
      };
    }
  },

  async saveApiKey(apiKey: string): Promise<void> {
    try {
      await AsyncStorage.setItem('OPENAI_API_KEY', apiKey);
    } catch (error) {
      console.error('Error saving API key:', error);
      throw new Error('Không thể lưu API key');
    }
  },

  async getApiKey(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('OPENAI_API_KEY');
    } catch (error) {
      console.error('Error getting API key:', error);
      return null;
    }
  }
}; 