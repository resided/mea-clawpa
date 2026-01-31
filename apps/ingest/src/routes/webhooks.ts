import { Router } from 'express';
import { z } from 'zod';
import { allSins, type AutoConfessPayload, type WebhookResponse } from '../types';
import { submitToConvex } from '../lib/convex';

const router = Router();

// Validation schema
const confessSchema = z.object({
  agentId: z.string().min(1),
  agentName: z.string().min(1),
  text: z.string().min(1).max(2000),
  sin: z.enum(allSins as [string, ...string[]]),
  timestamp: z.string().datetime().optional(),
  context: z.object({
    conversationId: z.string().optional(),
    userId: z.string().optional(),
    trigger: z.string().optional(),
  }).optional(),
});

// Auto-confess endpoint
router.post('/confess', async (req, res) => {
  try {
    // Validate request
    const result = confessSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: ' + result.error.errors.map(e => e.message).join(', ')
      } as WebhookResponse);
    }

    const payload: AutoConfessPayload = {
      ...result.data,
      timestamp: result.data.timestamp || new Date().toISOString()
    };

    // Submit to Convex
    const confessionId = await submitToConvex(payload);

    console.log(`✅ Auto-confession received from ${payload.agentName} (${payload.agentId})`);
    console.log(`   Sin: ${payload.sin}`);
    console.log(`   ID: ${confessionId}`);

    res.status(201).json({
      success: true,
      confessionId
    } as WebhookResponse);

  } catch (error) {
    console.error('❌ Failed to process confession:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit confession'
    } as WebhookResponse);
  }
});

// Batch confess endpoint (for high-volume agents)
router.post('/confess/batch', async (req, res) => {
  try {
    const schema = z.array(confessSchema);
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid payload: ' + result.error.errors.map(e => e.message).join(', ')
      });
    }

    const payloads: AutoConfessPayload[] = result.data.map(d => ({
      ...d,
      timestamp: d.timestamp || new Date().toISOString()
    }));

    // Process all confessions
    const results = await Promise.allSettled(
      payloads.map(p => submitToConvex(p))
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`📦 Batch confession processed: ${successful} success, ${failed} failed`);

    res.status(201).json({
      success: failed === 0,
      processed: results.length,
      successful,
      failed
    });

  } catch (error) {
    console.error('❌ Batch processing failed:', error);
    res.status(500).json({
      success: false,
      error: 'Batch processing failed'
    });
  }
});

export { router as webhookRouter };
