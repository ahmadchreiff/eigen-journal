import Draft from '../models/Draft.js';

export const submitDraft = async (req, res) => {
  try {
    console.log('📝 Received draft submission');
    console.log('Body:', req.body);
    console.log('File:', req.file);

    // Parse metadata from JSON string
    let meta = {};
    try {
      meta = JSON.parse(req.body.metadata || '{}');
    } catch (parseError) {
      console.error('❌ Error parsing metadata:', parseError);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid metadata format' 
      });
    }

    const { file } = req; // from multer

    // Create draft document
    const draftData = {
      ...meta,
      pdfPath: file?.path,
      fileName: file?.originalname,
      fileSize: file?.size,
    };

    console.log('💾 Creating draft with data:', draftData);

    const draft = await Draft.create(draftData);

    console.log('✅ Draft created successfully:', draft._id);

    return res.status(201).json({ 
      success: true, 
      draftId: draft._id,
      message: 'Draft submitted successfully'
    });

  } catch (err) {
    console.error('❌ Error in submitDraft:', err);
    res.status(400).json({ 
      success: false, 
      message: err.message || 'Failed to submit draft'
    });
  }
};