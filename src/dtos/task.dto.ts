import { IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, IsNumber, Min, Max, ValidateNested, IsObject, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class Location {
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @ApiProperty({required : true, example: [40.7128, -74.0060]})
    coordinates: number[];

    @ApiProperty({required : true, example: "Point"})
    @IsString()
    type: string
}

export class CreateTaskDto {
    @ApiProperty({required : true})
    @IsNotEmpty()
    description: string;

    @ApiProperty({required : true})
    @IsObject()
    @ValidateNested()
    @Type(() => Location)
    location: Location;
}

export class UpdateTaskDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsNotEmpty()
    description?: string;

    @ApiProperty({ required: false })
    @IsObject()
    @IsOptional()
    @ValidateNested()
    @Type(() => Location)
    location?: Location;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsNumber()
    workerId?: number;
}