import React, { useEffect, useState } from 'react';
import { getOfficerSessionsByOfficerId } from '@/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Smartphone, Tablet, MapPin, Loader2, History } from 'lucide-react';

interface DeviceInfo {
  browser?: string;
  os?: string;
  device?: string;
}

interface SessionData {
  session_id: string;
  officer_id: string;
  officer_email: string;
  ip_address: string;
  device_info: any | DeviceInfo;
  latitude: number;
  longitude: number;
  login_time: string;
  logout_time: string | null;
  is_active: boolean;
  session_metadata: any;
  token: string;
  created_at: string;
  updated_at: string;
}

interface SessionTableProps {
  officerId: string;
}

const SessionTable: React.FC<SessionTableProps> = ({ officerId }) => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      if (!officerId) return;
      
      try {
        setLoading(true);
        const response = await getOfficerSessionsByOfficerId({
          officer_id: officerId
        });
        
        if (response.status === 'success') {
          setSessions(response.data);
        } else {
          setError(response.message || 'Failed to fetch sessions');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching sessions');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [officerId]);

  const formatDeviceInfo = (deviceInfo: string | DeviceInfo): DeviceInfo => {
    if (typeof deviceInfo === 'string') {
      return { browser: deviceInfo, os: 'Unknown', device: 'Unknown' };
    }
    
    if (typeof deviceInfo === 'object' && deviceInfo !== null) {
      return {
        browser: deviceInfo.browser || 'Unknown',
        os: deviceInfo.os || 'Unknown',
        device: deviceInfo.device || 'Unknown'
      };
    }
    
    return { browser: 'Unknown', os: 'Unknown', device: 'Unknown' };
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={16} />
      case 'tablet':
        return <Tablet size={16} />
      default:
        return <Monitor size={16} />
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full rounded-lg">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <div className="w-full rounded-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            Officer Sessions
          </CardTitle>
          <CardDescription>All your login sessions and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Device</TableHead>
                  <TableHead className="font-bold">Browser</TableHead>
                  <TableHead className="font-bold">OS</TableHead>
                  <TableHead className="font-bold">IP Address</TableHead>
                  <TableHead className="font-bold">Login Time</TableHead>
                  <TableHead className="font-bold">Logout Time</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No sessions found
                    </TableCell>
                  </TableRow>
                ) : (
                  sessions.map((session) => {
                    const deviceInfo = formatDeviceInfo(session.device_info);
                    return (
                      <TableRow key={session.session_id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getDeviceIcon(deviceInfo.device || 'Unknown')}
                            <span>{deviceInfo.device || 'Unknown'}</span>
                          </div>
                        </TableCell>
                        <TableCell>{deviceInfo.browser}</TableCell>
                        <TableCell>{deviceInfo.os}</TableCell>
                        <TableCell>{session.ip_address}</TableCell>
                        <TableCell>{new Date(session.login_time).toLocaleString()}</TableCell>
                        <TableCell>
                          {session.logout_time ? new Date(session.logout_time).toLocaleString() : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={session.is_active ? "default" : "secondary"}>
                            {session.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-muted-foreground" />
                            <span className="text-xs">
                              {session.latitude && session.longitude 
                                ? `${session.latitude.toFixed(4)}, ${session.longitude.toFixed(4)}`
                                : 'Unknown'
                              }
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default SessionTable;
