const DISCORD_USER_ID = '767472356040900638';
const LANYARD_API = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;

async function loadDiscordStatus() {
  const discordContainer = document.getElementById('discord-status-hero') || document.getElementById('discord-status');
  
  if (!discordContainer) return;
  
  try {
    const response = await fetch(LANYARD_API);
    const data = await response.json();
    
    if (data.success) {
      const userData = data.data;
      const statusMap = {
        'online': { color: '#43b581', label: 'Online' },
        'idle': { color: '#faa61a', label: 'Idle' },
        'dnd': { color: '#f04747', label: 'Do Not Disturb' },
        'offline': { color: '#747f8d', label: 'Offline' }
      };
      
      const status = userData.discord_status || 'offline';
      const statusInfo = statusMap[status];
      
      let activityHTML = '';
      if (userData.activities && userData.activities.length > 0) {
        const activity = userData.activities[0];
        activityHTML = `<p class="discord-activity">${activity.name}</p>`;
      }
      
      const discordHTML = `
        <div class="discord-widget">
          <div class="discord-header">
            <img src="https://cdn.discordapp.com/avatars/${userData.discord_user.id}/${userData.discord_user.avatar}.png?size=128" 
                 alt="${userData.discord_user.username}" 
                 class="discord-avatar">
            <div class="discord-info">
              <h3>${userData.discord_user.username}</h3>
              <div class="discord-status-badge">
                <span class="status-dot" style="background-color: ${statusInfo.color}"></span>
                <span>${statusInfo.label}</span>
              </div>
            </div>
          </div>
          ${activityHTML}
        </div>
      `;
      
      discordContainer.innerHTML = discordHTML;
    } else {
      console.error('Discord API error:', data);
    }
  } catch (error) {
    console.error('Error fetching Discord status:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadDiscordStatus);