// Get dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const dashboardData = {
      revenues: 2129430,
      transactions: 1520,
      likes: 9721,
      users: 3106,
      topProducts: [
        { name: 'Basic Tees', percentage: 55 },
        { name: 'Custom Short Pants', percentage: 31 },
        { name: 'Super Hoodies', percentage: 14 }
      ]
    };

    res.status(200).json({
      status: 'success',
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Add user profile
exports.addProfile = async (req, res) => {
  try {
    const { name, email, phone, instagram, youtube } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and phone are required'
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, instagram, youtube },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};