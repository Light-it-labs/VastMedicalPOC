<?php

declare(strict_types=1);

namespace Lightit\Insurance\App\Request;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Lightit\Insurance\Domain\DataTransferObjects\MedicareEligibilityCheckDto;
use Lightit\Shared\App\Enums\USState;

class MedicareEligibilityCheckRequest extends FormRequest
{
    public const MEMBER_ID = 'member_id';
    public const STATE = 'state';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const DOB = 'dob';

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            self::MEMBER_ID => ['required', 'string'],
            self::STATE => ['required', 'string'],
            self::FIRST_NAME => ['required', 'string'],
            self::LAST_NAME => ['required', 'string'],
            self::DOB => ['required', 'date'],
        ];
    }

    public function toDto(): MedicareEligibilityCheckDto
    {
        /** @var Carbon $dob */
        $dob = $this->date(self::DOB);

        return new MedicareEligibilityCheckDto(
            state: USState::from($this->string(self::STATE)->toString()),
            member_id: $this->string(self::MEMBER_ID)->toString(),
            first_name: $this->string(self::FIRST_NAME)->toString(),
            last_name: $this->string(self::LAST_NAME)->toString(),
            dob: $dob,
        );
    }
}
