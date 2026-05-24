/**
 * databaseUtilities.ts
 * Supabase database functions for access codes and sessions
 */

// Type definitions
interface AccessCodeData {
  [key: string]: any;
}

interface SessionData {
  access_code: string;
  session_id: string;
}

interface UpdateData {
  [key: string]: any;
  subscription_id: string;
}

interface SuccessResponse<T> {
  success: true;
  data?: T;
  valid?: boolean;
}

interface ErrorResponse {
  success: false;
  error: string;
  valid?: boolean;
}

// Access Code Functions

export async function createAccessCode(
  supabaseClient: any,
  codeData: AccessCodeData
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const { data, error } = await supabaseClient
      .from('access_codes')
      .insert([codeData])
      .select();

    if (error) throw error;

    return {
      success: true,
      data: data?.[0],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error creating access code:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function getAccessCodeByCode(
  supabaseClient: any,
  code: string
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const { data, error } = await supabaseClient
      .from('access_codes')
      .select('*')
      .eq('code', code)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error getting access code:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function updateAccessCodeStatus(
  supabaseClient: any,
  updates: UpdateData
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const { data, error } = await supabaseClient
      .from('access_codes')
      .update(updates)
      .eq('subscription_id', updates.subscription_id)
      .select();

    if (error) throw error;

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error updating access code:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function incrementAccessCodeUses(
  supabaseClient: any,
  code: string
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const { data: current, error: fetchError } = await supabaseClient
      .from('access_codes')
      .select('current_uses')
      .eq('code', code)
      .single();

    if (fetchError) throw fetchError;

    const { data, error } = await supabaseClient
      .from('access_codes')
      .update({ current_uses: (current.current_uses || 0) + 1 })
      .eq('code', code)
      .select();

    if (error) throw error;

    return {
      success: true,
      data: data?.[0],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error incrementing access code uses:', error);
    return {
      success: false,
      error: message,
    };
  }
}

// Session Functions

export async function createSession(
  supabaseClient: any,
  { access_code, session_id }: SessionData
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabaseClient
      .from('sessions')
      .insert([
        {
          access_code: access_code,
          session_id: session_id,
          expires_at: expiresAt,
        },
      ])
      .select();

    if (error) throw error;

    return {
      success: true,
      data: data?.[0],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error creating session:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function validateSession(
  supabaseClient: any,
  accessCode: string,
  sessionId: string
): Promise<SuccessResponse<any> | ErrorResponse> {
  try {
    const { data, error } = await supabaseClient
      .from('sessions')
      .select('*')
      .eq('access_code', accessCode)
      .eq('session_id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error) throw error;

    return {
      success: true,
      valid: !!data,
      data: data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error validating session:', error);
    return {
      success: false,
      valid: false,
      error: message,
    };
  }
}

export async function deleteSession(
  supabaseClient: any,
  sessionId: string
): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const { error } = await supabaseClient
      .from('sessions')
      .delete()
      .eq('session_id', sessionId);

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error deleting session:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function cleanupExpiredSessions(
  supabaseClient: any,
  accessCode: string
): Promise<SuccessResponse<null> | ErrorResponse> {
  try {
    const { error } = await supabaseClient
      .from('sessions')
      .delete()
      .eq('access_code', accessCode)
      .lt('expires_at', new Date().toISOString());

    if (error) throw error;

    return {
      success: true,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error cleaning up sessions:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export default {
  createAccessCode,
  getAccessCodeByCode,
  updateAccessCodeStatus,
  incrementAccessCodeUses,
  createSession,
  validateSession,
  deleteSession,
  cleanupExpiredSessions,
};
