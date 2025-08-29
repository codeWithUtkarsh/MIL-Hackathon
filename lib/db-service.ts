import { getDatabase } from './database';
import type { Member, Asset, Event, Activity, DashboardStats, AssetReview } from './types';

export class DatabaseService {
  private static instance: DatabaseService;
  private db = getDatabase();

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Member operations
  async createMember(memberData: Omit<Member, 'id' | 'createdAt'>): Promise<Member> {
    const member = this.db.createMember(memberData);

    // Create activity for new member
    await this.createActivity({
      type: 'member_joined',
      memberId: member.id,
      memberName: member.name,
      description: `Joined as ${member.role}`,
      status: 'active'
    });

    return member;
  }

  async getAllMembers(): Promise<Member[]> {
    return this.db.getAllMembers();
  }

  async getActiveCreators(): Promise<Member[]> {
    return this.db.getActiveCreators();
  }

  async updateMember(id: string, updates: Partial<Member>): Promise<void> {
    this.db.updateMember(id, updates);
  }

  async getMemberById(id: string): Promise<Member | null> {
    return this.db.getMemberById(id);
  }

  // Asset operations
  async createAsset(assetData: Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>): Promise<Asset> {
    const asset = this.db.createAsset(assetData);

    // Get creator info for activity
    const creator = await this.getMemberById(asset.creatorId);
    if (creator) {
      await this.createActivity({
        type: 'asset_submitted',
        memberId: creator.id,
        memberName: creator.name,
        description: `Submitted ${asset.type}: ${asset.title}`,
        status: asset.status,
        relatedId: asset.id
      });
    }

    return asset;
  }

  async getAllAssets(): Promise<Asset[]> {
    return this.db.getAllAssets();
  }

  async getAssetsByStatus(status: Asset['status']): Promise<Asset[]> {
    return this.db.getAssetsByStatus(status);
  }

  async updateAsset(id: string, updates: Partial<Asset>): Promise<void> {
    this.db.updateAsset(id, updates);
  }

  async approveAsset(id: string, review: AssetReview, approverUserId: string): Promise<void> {
    const asset = await this.db.getAssetById(id);
    const creator = asset ? await this.getMemberById(asset.creatorId) : null;

    if (!asset || !creator) return;

    // Update asset with approval
    await this.updateAsset(id, {
      status: 'approved',
      review,
      score: review.overall,
      approvedAt: new Date().toISOString(),
      approvedBy: approverUserId
    });

    // Create activity
    await this.createActivity({
      type: 'asset_approved',
      memberId: creator.id,
      memberName: creator.name,
      description: `${asset.title} approved`,
      status: 'approved',
      relatedId: asset.id
    });
  }

  async rejectAsset(id: string, review: AssetReview): Promise<void> {
    const asset = await this.db.getAssetById(id);
    const creator = asset ? await this.getMemberById(asset.creatorId) : null;

    if (!asset || !creator) return;

    // Update asset with rejection
    await this.updateAsset(id, {
      status: 'rejected',
      review,
      score: review.overall
    });

    // Create activity
    await this.createActivity({
      type: 'asset_rejected',
      memberId: creator.id,
      memberName: creator.name,
      description: `${asset.title} rejected`,
      status: 'rejected',
      relatedId: asset.id
    });
  }

  // Event operations
  async createEvent(eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
    const event = this.db.createEvent(eventData);

    // Get ambassador info for activity
    const ambassador = await this.getMemberById(event.ambassadorId);
    if (ambassador) {
      await this.createActivity({
        type: 'event_created',
        memberId: ambassador.id,
        memberName: ambassador.name,
        description: `Hosted event at ${event.location}`,
        status: 'completed',
        relatedId: event.id
      });
    }

    return event;
  }

  async getAllEvents(): Promise<Event[]> {
    return this.db.getAllEvents();
  }

  async updateEvent(id: string, updates: Partial<Event>): Promise<void> {
    this.db.updateEvent(id, updates);
  }

  // Activity operations
  async createActivity(activityData: Omit<Activity, 'id' | 'timestamp'>): Promise<Activity> {
    return this.db.createActivity(activityData);
  }

  async getAllActivities(): Promise<Activity[]> {
    return this.db.getAllActivities();
  }

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    return this.db.getRecentActivities(limit);
  }

  // Dashboard operations
  async getDashboardStats(): Promise<DashboardStats> {
    return this.db.getDashboardStats();
  }

  // Seed some sample data if database is empty
  async seedSampleData(): Promise<void> {
    const existingMembers = await this.getAllMembers();
    if (existingMembers.length > 0) {
      return; // Already has data
    }

    console.log('Seeding sample data...');

    // Create sample creators
    const creators = [
      {
        role: 'creator' as const,
        name: 'Sarah Johnson',
        email: 'sarah.j@university.edu',
        handle: '@sarahcreates',
        campus: 'University of California',
        languages: ['English', 'Spanish'],
        points: 120,
        isActive: true
      },
      {
        role: 'creator' as const,
        name: 'Mike Chen',
        email: 'mike.chen@college.edu',
        handle: '@mikecontent',
        campus: 'Stanford University',
        languages: ['English', 'Mandarin'],
        points: 95,
        isActive: true
      },
      {
        role: 'creator' as const,
        name: 'Elena Rodriguez',
        email: 'elena.r@uni.edu',
        handle: '@elenadigital',
        campus: 'MIT',
        languages: ['English', 'Spanish', 'Portuguese'],
        points: 150,
        isActive: true
      }
    ];

    const createdCreators = [];
    for (const creator of creators) {
      const newCreator = await this.createMember(creator);
      createdCreators.push(newCreator);
    }

    // Create sample assets
    const assets = [
      {
        creatorId: createdCreators[0].id,
        type: 'video' as const,
        topic: 'deepfake' as const,
        title: 'How to Spot Deepfakes in Political Content',
        link: 'https://youtube.com/watch?v=demo1',
        caption: 'In this comprehensive guide, we explore the telltale signs of deepfake technology in political advertisements and social media content. Learn to identify inconsistencies in facial movements, lighting, and audio synchronization that can reveal manipulated media.',
        citations: [
          'https://research.example.com/deepfake-detection',
          'https://university.edu/media-literacy-study'
        ],
        accessibility: { captions: true },
        status: 'approved' as const,
        score: 85,
        monthlyViews: 2500,
        totalViews: 8500,
        approvedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        approvedBy: 'admin-1'
      },
      {
        creatorId: createdCreators[1].id,
        type: 'carousel' as const,
        topic: 'ad-transparency' as const,
        title: 'Political Ad Disclosure Requirements',
        link: 'https://instagram.com/p/demo2',
        caption: 'Understanding political advertisement disclosure laws is crucial for media literacy. This carousel breaks down the requirements for political ads across different platforms and jurisdictions, helping viewers identify properly disclosed content.',
        citations: [
          'https://fec.gov/help-candidates-and-committees/advertising/',
          'https://transparency.org/political-ads-guide'
        ],
        accessibility: { captions: false },
        status: 'pending' as const,
        score: 0,
        monthlyViews: 0,
        totalViews: 0
      },
      {
        creatorId: createdCreators[2].id,
        type: 'script' as const,
        topic: 'verify-30s' as const,
        title: '30-Second Fact Check Framework',
        link: 'https://docs.google.com/document/d/demo3',
        caption: 'A quick reference script for conducting rapid fact-checks of viral claims. This framework provides a structured approach to verifying information in under 30 seconds using reliable sources and cross-referencing techniques.',
        citations: [
          'https://factcheck.org/methodology/',
          'https://poynter.org/fact-checking-guide'
        ],
        accessibility: { captions: true },
        status: 'approved' as const,
        score: 92,
        monthlyViews: 1800,
        totalViews: 5200,
        approvedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        approvedBy: 'admin-1'
      }
    ];

    for (const asset of assets) {
      await this.createAsset(asset);
    }

    // Create sample ambassador
    const ambassador = await this.createMember({
      role: 'ambassador',
      name: 'Dr. Amanda Wilson',
      email: 'amanda.wilson@university.edu',
      handle: '@dramandaw',
      campus: 'Harvard University',
      languages: ['English'],
      points: 250,
      isActive: true
    });

    // Create sample event
    await this.createEvent({
      ambassadorId: ambassador.id,
      dateISO: new Date(Date.now() - 86400000 * 3).toISOString(),
      location: 'Harvard University - Media Literacy Workshop',
      attendees: 45,
      preAvg: 62,
      postAvg: 84,
      deltaPct: 35.5,
      assetsUsed: [assets[0].creatorId, assets[2].creatorId],
      recapLink: 'https://harvard.edu/events/media-literacy-recap',
      rightOfReply: true
    });

    console.log('Sample data seeded successfully!');
  }
}

// Export singleton instance
export const dbService = DatabaseService.getInstance();
