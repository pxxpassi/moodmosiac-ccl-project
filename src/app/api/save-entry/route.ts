import {NextResponse} from 'next/server';
import {RDSClient, ExecuteStatementCommand} from '@aws-sdk/client-rds';

// Initialize RDS client
const rdsClient = new RDSClient({
  region: 'YOUR_AWS_REGION', // Replace with your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!, // Ensure these are set in your environment
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {userId, entryDate, moodColor, reflection, imageUrl, createdAt, updatedAt} =
      body;

    // Ensure all required fields are present
    if (
      !userId ||
      !entryDate ||
      !moodColor ||
      !reflection ||
      !createdAt ||
      !updatedAt
    ) {
      console.error('Missing required fields:', body);
      return NextResponse.json(
        {message: 'Missing required fields'},
        {status: 400}
      );
    }

    // SQL statement to insert data into the MoodEntries table
    const sql = `
      INSERT INTO MoodEntries (userId, entryDate, moodColor, reflection, imageUrl, createdAt, updatedAt)
      VALUES (:userId, :entryDate, :moodColor, :reflection, :imageUrl, :createdAt, :updatedAt)
    `;

    // Parameters for the SQL statement
    const params = {
      resourceArn: process.env.RDS_RESOURCE_ARN!, // Ensure this is set in your environment
      secretArn: process.env.RDS_SECRET_ARN!, // Ensure this is set in your environment
      sql: sql,
      parameters: [
        {name: 'userId', value: {stringValue: userId}},
        {name: 'entryDate', value: {stringValue: entryDate}},
        {name: 'moodColor', value: {stringValue: moodColor}},
        {name: 'reflection', value: {stringValue: reflection}},
        {name: 'imageUrl', value: {stringValue: imageUrl || ''}}, // Handle null imageUrl
        {name: 'createdAt', value: {stringValue: createdAt}},
        {name: 'updatedAt', value: {stringValue: updatedAt}},
      ],
    };

    // Execute the SQL statement
    const command = new ExecuteStatementCommand(params);
    const response = await rdsClient.send(command);

    console.log('RDS Response:', response);

    // Check if the insertion was successful
    if (response.numberOfRecordsUpdated === 1) {
      return NextResponse.json({message: 'Entry saved successfully'}, {status: 201});
    } else {
      console.error('Failed to save entry. RDS response:', response);
      return NextResponse.json(
        {message: 'Failed to save entry'},
        {status: 500}
      );
    }
  } catch (error: any) {
    console.error('Error saving entry:', error);
    return NextResponse.json(
      {message: error.message || 'Internal server error'},
      {status: 500}
    );
  }
}
